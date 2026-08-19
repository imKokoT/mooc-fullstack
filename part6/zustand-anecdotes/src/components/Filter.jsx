import { useAnecdoteActions } from '../states/anecdotes'

function Filter() {
  const { setFilter } = useAnecdoteActions()

  function handleChange(event) {
    const data = event.target.value
    setFilter(data)
    console.log('new filter set')
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
