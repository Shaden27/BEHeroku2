
import React,{useState,useEffect} from 'react'
import {useNavigate,Navigate,Link} from 'react-router-dom'

function Account() {
    const [flag, setFlag]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('id')){
              console.log("Local storage exists")
              setFlag(true)
            }
  
      },[])
   

const handleLogout=()=>{
    console.log("Logging out")
    localStorage.removeItem('id')
    navigate('/')

}

  return (
    <div>
        {flag ? (<div>
            <h2>This is the Account page</h2>
            <button className='btn btn-primary btn-large' onClick={handleLogout}>Logout</button>
            </div>):
        (<div>{<Link to='/'>Go back to Login</Link>}</div>)}
        
    </div>
  )
}

export default Account