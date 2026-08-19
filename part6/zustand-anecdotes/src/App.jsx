import { useEffect } from 'react'
import AnecdotesList from './components/AnecdotesList'
import CreateNew from './components/CreateNew'
import Filter from './components/Filter'
import { useAnecdoteActions } from './states/anecdotes'

const App = () => {
  const { init } = useAnecdoteActions()

  useEffect(() => {
    init()
  }, [init])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdotesList />
      <CreateNew />
    </div>
  )
}

export default App