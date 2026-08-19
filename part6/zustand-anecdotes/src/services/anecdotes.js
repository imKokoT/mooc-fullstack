const baseUrl = 'http://localhost:3001/anecdotes'


async function getAll() {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

async function createNew(content) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            content: content,
            votes: 0 
        }),
    })
    
    if (!response.ok)
        throw new Error('Failed to create anecdote')
  
  return await response.json()
}

async function deleteOne(id) {
    const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' })

    if (!response.ok)
        throw new Error('Failed to delete anecdote')

    return await response.json()
}

async function update(anecdote) {
    const response = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            content: anecdote.content,
            votes: anecdote.votes
        }),
    })

    if (!response.ok)
        throw new Error('Failed to update anecdote')

    return await response.json()
}


export default {
    getAll,
    createNew,
    deleteOne,
    update
}
