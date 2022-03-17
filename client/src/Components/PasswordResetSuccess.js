import React from 'react'
import {Link} from 'react-router-dom'

function PasswordResetSuccess() {
  return (
    <div>
        <h1>Password Reset was Successful!!</h1>
        <Link to={"/"}>Go Back To Login</Link>
    </div>
  )
}

export default PasswordResetSuccess