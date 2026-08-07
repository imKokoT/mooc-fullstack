import { useContext } from 'react'
import './Notification.css'
import AppContext from '../contexts/AppContext'
import { Alert } from '@mui/material'


const Notification = () => {
  const { notification, setNotification } = useContext(AppContext)

  if (notification === null)
    return null
  
  const {message, msgType, timeout} = notification

  if (timeout)
    setTimeout(() => setNotification(null),
    timeout * 1000
  )

  return (
    <Alert severity={msgType} sx={{
      padding:1, margin: 1
    }}>
      {message}
    </Alert>
  )
}

export default Notification
