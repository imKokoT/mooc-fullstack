import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import AnecdotesService from '../src/services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from '../src/states/anecdotes'


vi.mock('../src/services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    addNew: vi.fn(),
    voteUp: vi.fn(),
  }
}))

describe('test anecdotes store', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({anecdotes: [], filter: ''})
    vi.clearAllMocks()
  })

  it('init', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 5 }]
    AnecdotesService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.init()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('display sorted anecdotes by votes from the store', async () => {

  })

  it('filter tests', async () => {

  })

  it('vote up an anecdote', async () => {

  })
})
