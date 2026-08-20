import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import AnecdotesService from '../services/anecdotes'


const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    init: async () => {
      const anecdotes = await AnecdotesService.getAll()
      set({ anecdotes })
    },

    voteUp: async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await AnecdotesService.update(
        { ...anecdote, votes: anecdote.votes + 1 }
      )

      set(state => ({
          anecdotes: state.anecdotes.map(
            a => a.id === id ? updated : a)
      }))
    },

    addNew: async content => { 
      const anecdote = await AnecdotesService.createNew(content)
      
      set(state => ({
        anecdotes: [...state.anecdotes, anecdote]
      }))
    },

    deleteOne: async id => {
      await AnecdotesService.deleteOne(id)
      set(state => ({anecdotes: state.anecdotes.filter(a => a.id !== id)}))
    },

    setFilter: filter => set(state => ({filter: state.filter = filter}))
  },
}))


export const useAnecdotes = () => useAnecdoteStore(useShallow(
  (state) => {
    const filtered = state.filter ? 
      state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())) :
      state.anecdotes
    
    return filtered.toSorted((a, b) => b.votes - a.votes)
  }
))
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore
