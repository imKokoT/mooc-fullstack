import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import AnecdotesService from '../src/services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from '../src/states/anecdotes'


vi.mock('../src/services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    addNew: vi.fn(),
    update: vi.fn(),
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
    const mockAnecdotes = [
      { id: 1, content: 'Test', votes: 5 },
      { id: 2, content: 'Test 2', votes: 1 },
      { id: 3, content: 'Test 3', votes: 2 },
      { id: 4, content: 'Test 4', votes: 7 },
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes.toSorted((a, b) => b.votes - a.votes))
  })

  it('filter tests', async () => {
    const mockAnecdotes = [
      { id: 4, content: 'foo', votes: 7 },
      { id: 1, content: 'bar', votes: 5 },
      { id: 3, content: 'bar Foo', votes: 2 },
      { id: 2, content: 'baz', votes: 1 },
    ]
    useAnecdoteStore.setState({anecdotes: mockAnecdotes})
    
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.setFilter('foo')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual([
      { id: 4, content: 'foo', votes: 7 },
      { id: 3, content: 'bar Foo', votes: 2 },
    ])
  })

  it('vote up an anecdote', async () => {
    const anecdote = { id: 1, content: 'Test', votes: 5 }
    useAnecdoteStore.setState({anecdotes: [anecdote]})
    AnecdotesService.update.mockResolvedValue({ ...anecdote, votes:6 })

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.voteUp(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    console.log(anecdotesResult.current)
    expect(anecdotesResult.current[0].votes).toBe(6)
  })
})
