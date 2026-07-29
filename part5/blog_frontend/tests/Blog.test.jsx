import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import helper from './helper'
import UserService from '../src/services/users'
import BlogService from '../src/services/blogs'

const mockBlogData = {
  id: '1',
  title: 'title',
  url: 'https://example.com',
  owner: {
    username: 'user',
  },
  likes: 42,
}

describe('Blog', () => {
  // eslint-disable-next-line no-unused-vars
  UserService.isAdmin = username => false
  
  beforeEach(() => {
    helper.renderWithProviders(
      <Blog blog={{...mockBlogData}} />
    )

    vi.mock('../src/services/blogs', () => ({
      default: {
        likeBlog: vi.fn().mockResolvedValue({}),
        getAll: vi.fn().mockResolvedValue([]),
      },
    }))
  })

  test('check default is shown', () => {
    // default
    expect(screen.queryByText('title By user')).toBeVisible()

    const detailsButton = screen.getByRole('button', { name: /View/i })
    expect(detailsButton).toBeVisible()

    // details
    expect(screen.queryByText(/https:\/\/example\.com/i)).not.toBeVisible()
    expect(screen.queryByText(/likes: 42/i)).not.toBeVisible()
  })

  test('check details is shown', async () => {  
    const user = userEvent.setup()

    const detailsButton = screen.getByRole('button', { name: 'View' })
    await user.click(detailsButton)

    expect(screen.queryByText(/https:\/\/example\.com/i)).toBeVisible()
    expect(screen.queryByText(/likes: 42/i)).toBeVisible()
  })

  test('click like button twice', async () => {
    const user = userEvent.setup()

    await user.click(
      screen.getByRole('button', { name: 'View' }))

    const likeButton = screen.getByRole('button', { name: 'like' })

    await user.click(likeButton)
    await user.click(likeButton)

    expect(BlogService.likeBlog).toHaveBeenCalledTimes(2)
  })
})
