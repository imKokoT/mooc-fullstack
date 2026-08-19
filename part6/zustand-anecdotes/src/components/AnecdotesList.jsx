import { useAnecdoteActions, useAnecdotes } from "../states/anecdotes"

function AnecdotesList() {
  const anecdotes = useAnecdotes()
  const { voteUp } = useAnecdoteActions()

  const vote = id => {
    voteUp(id)
    console.log('vote', id)
  }

  const display = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {display.map(anecdote => (
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
