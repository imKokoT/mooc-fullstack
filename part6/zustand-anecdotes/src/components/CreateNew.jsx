import { useAnecdoteActions, useAnecdotes } from "../store"

function CreateNew() {
  const anecdotes = useAnecdotes()
  const { addNew } = useAnecdoteActions()
  
  function onSubmit(event) {
    event.preventDefault()

    const anecdote = event.target.content.value

    if (!anecdote) {
      console.error('empty anecdote')
      return
    }
    if (anecdotes.some(item => item.content === anecdote)) {
      console.error('anecdote already exists')
      return
    }

    addNew(anecdote)
    console.log(`added new anecdote "${event.target.content.value}"`)

    // reset
    event.target.content.value = ''
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input name='content'/>
        </div>
        <button type='submit'>create</button>
      </form>            
    </div>
  )
}

export default CreateNew
