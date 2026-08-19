import { useEffect } from 'react'
import AnecdotesList from './components/AnecdotesList'
import CreateNew from './components/CreateNew'
import Filter from './components/Filter'
import { useAnecdoteActions } from './states/anecdotes'
import Notification from './components/Notification'

const App = () => {
  const { init } = useAnecdoteActions()

  useEffect(() => {
    init()
  }, [init])

  return (
    <div>
      <Notification />

      <h2>Anecdotes</h2>
      <Filter />
      <AnecdotesList />
      <CreateNew />
    </div>
  )
}

export default App