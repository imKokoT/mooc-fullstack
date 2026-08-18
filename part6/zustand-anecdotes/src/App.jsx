import AnecdotesList from './components/AnecdotesList'
import CreateNew from './components/CreateNew'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <CreateNew />
    </div>
  )
}

export default App