import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import helper from './helper'
import UserService from '../src/services/users'
import BlogService from '../src/services/blogs'
import { beforeEach, describe } from 'vitest'

const blogs = [
  {
    id: '1',
    title: 'title',
    url: 'https://example.com',
    owner: {
      username: 'user',
    },
    likes: 42,
  },
  {
    id: '2',
    title: 'another',
    url: 'https://example.com',
    owner: {
      username: 'other',
    },
    likes: 23,
  }
]

describe('Blog', () => {
  // eslint-disable-next-line no-unused-vars
  UserService.isAdmin = username => false
  
  beforeEach(() => {
    vi.mock('../src/services/blogs', () => ({
      default: {
        likeBlog: vi.fn().mockResolvedValue({}),
        getAll: vi.fn().mockResolvedValue([]),
      },
    }))
  })

  describe('logged in + owner of the blog', () => {
    beforeEach(() => {
      vi.clearAllMocks()

      helper.renderWithProviders(
        <Blog blog={{...blogs[0]}} />,
        { username: 'user' }
      )    
    })

    test('check visible elements', async () => {  
      expect(screen.queryByText(/title/)).toBeVisible()
      expect(screen.queryByText(/by user/i)).toBeVisible()
      expect(screen.queryByText(/https:\/\/example\.com/i)).toBeVisible()
      expect(screen.queryByText(/likes: 42/i)).toBeVisible()
      expect(screen.queryByRole('button', {name: /like/i})).toBeInTheDocument()
      expect(screen.queryByRole('button', {name: /delete/i})).toBeInTheDocument()
    })
  
    test('click like button', async () => {
      const user = userEvent.setup()
  
      const likeButton = screen.getByRole('button', { name: /like/ })
      await user.click(likeButton)
      
      expect(BlogService.likeBlog).toHaveBeenCalledTimes(1)
    })
  })

  describe('logged in + not owner of the blog', () => {    
    beforeEach(() => {
      vi.clearAllMocks()

      helper.renderWithProviders(
        <Blog blog={{...blogs[1]}} />,
        { username: 'user' }
      )
    })

    test('check visible elements', async () => {  
      expect(screen.queryByText(/another/)).toBeVisible()
      expect(screen.queryByText(/by other/i)).toBeVisible()
      expect(screen.queryByText(/https:\/\/example\.com/i)).toBeVisible()
      expect(screen.queryByText(/likes: 23/i)).toBeVisible()
      expect(screen.queryByRole('button', {name: /like/i})).toBeInTheDocument()
      expect(screen.queryByRole('button', {name: /delete/i})).not.toBeInTheDocument()
    })
  
    test('click like button', async () => {
      const user = userEvent.setup()
  
      const likeButton = screen.getByRole('button', { name: /like/ })
      await user.click(likeButton)
      
      expect(BlogService.likeBlog).toHaveBeenCalledTimes(1)
    })
  })

  describe('not logged in', () => {
    beforeEach(() => {
      vi.clearAllMocks()

      helper.renderWithProviders(
        <Blog blog={{...blogs[1]}} />,
        null
      )
    })

    test('check visible elements', async () => {  
      expect(screen.queryByText(/another/)).toBeVisible()
      expect(screen.queryByText(/by other/i)).toBeVisible()
      expect(screen.queryByText(/https:\/\/example\.com/i)).toBeVisible()
      expect(screen.queryByText(/likes: 23/i)).toBeVisible()
      expect(screen.queryByRole('button', {name: /like/i})).not.toBeInTheDocument()
      expect(screen.queryByRole('button', {name: /delete/i})).not.toBeInTheDocument()
    })
  })
})
