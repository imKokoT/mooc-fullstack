import { screen, fireEvent } from '@testing-library/react'
import { describe, expect, vi, beforeEach } from 'vitest'
import BlogService from '../src/services/blogs'
import NewBlogForm from '../src/components/NewBlogForm'
import helper from './helper';

describe('NewBlogForm', () => {
  beforeEach(() => {
    helper.renderWithProviders(
      <NewBlogForm ref={null} />
    )

    vi.mock('../src/services/blogs', () => ({
    default: {
      createBlog: vi.fn().mockResolvedValue(),
    },}))
  })

  test('should call BlogsService.createBlog when the form is submitted successfully', async () => {
    // fill field
    const titleInput = screen.getByLabelText(/Title:/i)
    const urlInput = screen.getByLabelText(/Url:/i)

    fireEvent.change(titleInput, { target: { value: 'Test Blog Title' } })
    fireEvent.change(urlInput, { target: { value: 'testurl' } })

    // submit
    const submitButton = screen.getByRole('button', { name: /Create/i })
    fireEvent.click(submitButton)

    await expect(BlogService.createBlog).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      url: 'testurl',
    })
  })
})
