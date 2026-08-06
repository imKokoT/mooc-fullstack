import { render } from '@testing-library/react'
import AppContext from '../src/contexts/AppContext'
import LoginContext from '../src/contexts/LoginContext'
import { MemoryRouter } from 'react-router-dom'


function renderWithProviders(ui, user) {
  return render(
    <MemoryRouter>
      <AppContext.Provider value={{
        blogs: [], setBlogs: () => {}, 
        notification: {}, setNotification: () => {}
      }}>
      <LoginContext.Provider value={{user: user, setUser: () => {}}}>
      
        {ui}
      
      </LoginContext.Provider>
      </AppContext.Provider>
    </MemoryRouter>
  )
}

export default {
    renderWithProviders
}
