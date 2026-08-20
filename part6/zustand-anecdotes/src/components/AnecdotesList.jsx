import { useAnecdoteActions, useAnecdotes } from "../states/anecdotes"
import { useNotificationActions } from "../states/notification"


function Anecdote({ anecdote }) {
  const { voteUp, deleteOne } = useAnecdoteActions()
  const { showInfo } = useNotificationActions()

  function vote(id) {
    voteUp(id)
    console.log('vote', id)
  }

  async function deleteSelf() {
    await deleteOne(anecdote.id)
    console.log('deleted anecdote', anecdote.id)
    showInfo('deleted anecdote successfully!')
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
        
        {/* if zero votes, show delete button */}
        {anecdote.votes === 0 && <button onClick={deleteSelf}>delete</button>}
      </div>
    </div>
  )
}

function AnecdotesList() {
  const anecdotes = useAnecdotes()

  return (
    <div>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} /> ) }
    </div>
  )
}

export default AnecdotesList
