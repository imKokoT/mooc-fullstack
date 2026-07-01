import './notification.css'

const Notification = ({ notification }) => {
  if (notification === null)
    return null
  
  const {message, msgType} = notification

  return (
    // ok it's clean but non-intuitive\
    // <div className='notification' className={msgType}></div>
    <div className={`notification ${msgType}`}>
      {message}
    </div>
  )
}

export default Notification
