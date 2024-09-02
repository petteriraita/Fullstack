const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notifCSS'>
      {message}
    </div>
  )
}

export default Notification
