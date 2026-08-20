import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import AnecdotesService from '../src/services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions } from '../src/states/anecdotes'


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
    
  })

  it('display sorted anecdotes by votes from the store', async () => {

  })

  it('filter tests', async () => {

  })

  it('vote up an anecdote', async () => {

  })
})
