import AnecdotesList from './components/AnecdotesList'
import CreateNew from './components/CreateNew'
import Filter from './components/Filter'

const App = () => {

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