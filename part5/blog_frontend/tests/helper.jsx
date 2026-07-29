import { render } from '@testing-library/react'
import AppContext from '../src/contexts/AppContext'
import LoginContext from '../src/contexts/LoginContext'

function renderWithProviders(ui) {
  return render(
    <AppContext.Provider value={{
      blogs: [], setBlogs: () => {}, 
      notification: {}, setNotification: () => {}
    }}>
    <LoginContext.Provider value={{user: [], setUser: () => {}}}>
    
      {ui}
    
    </LoginContext.Provider>
    </AppContext.Provider>
  )
}

export default {
    renderWithProviders
}
