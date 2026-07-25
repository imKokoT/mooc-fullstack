import { useContext } from 'react'
import './Notification.css'
import AppContext from '../contexts/AppContext'


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
    // ok it's clean but non-intuitive\
    // <div className='notification' className={msgType}></div>
    <div className={`notification ${msgType}`}>
      {message}
    </div>
  )
}

export default Notification
