import { 
  useNotificationActions,
  useNotificationMsg, 
  useNotificationTimeout 
} from "../states/notification"


function Notification() {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const msg = useNotificationMsg()
  const timeout = useNotificationTimeout()
  const { reset } = useNotificationActions()

  if (msg === null)
    return null
  
  if (timeout)
    setTimeout(() => reset(),
    timeout * 1000
  )

  return (
    <div style={style}>
      {msg}
    </div>
  ) 
}

export default Notification