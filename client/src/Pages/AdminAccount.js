import React,{useState,useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import AdminNavbar from '../Components/AdminNavbar'

function AdminAccount() {

  const [flag, setFlag]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('Admin_id')){
            console.log("In Admin Account")
              console.log("Local storage exists")
              setFlag(true)
            }
  
      },[])

      const handleReset=()=>{
        console.log("Resetting password")
        navigate('/resetPassword', {state:{id:"a"}})
      
      }

  return (
    <div>
      <AdminNavbar nameOf='adminAccount'></AdminNavbar>
      {flag ? (<div>
            <h2>This is the Account page</h2>
            
            <button className='btn btn-secondary btn-large' onClick={handleReset}>Reset Password</button>
            <br></br>
            <br></br>
           
            </div>):
        (<div>{<Link to='/adminLogin'>Go back to Login</Link>}</div>)}
    </div>
  )
}

export default AdminAccount