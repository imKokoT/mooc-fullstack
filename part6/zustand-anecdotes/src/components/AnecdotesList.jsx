import { useAnecdotes } from "../store"

function AnecdotesList() {
  const anecdotes = useAnecdotes()

  const vote = id => {
    console.log('vote', id)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdotesList
