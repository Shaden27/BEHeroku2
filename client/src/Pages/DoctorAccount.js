
import React,{useState,useEffect} from 'react'
import {useNavigate,Navigate,Link} from 'react-router-dom'
import DoctorNavbar from '../Components/DoctorNavbar'

function DoctorAccount() {
    const [flag, setFlag]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('Doc_id')){
            console.log("In doctor Account")
              console.log("Local storage exists")
              setFlag(true)
            }
  
      },[])
   



const handleReset=()=>{
  console.log("Resetting password")
  navigate('/resetPassword')

}

  return (
    <div>
       <DoctorNavbar nameOf='doctorAccount'></DoctorNavbar>
        {flag ? (<div>
            <h2>This is the Account page</h2>
            
            <button className='btn btn-secondary btn-large' onClick={handleReset}>Reset Password</button>
            <br></br>
            <br></br>
           
            </div>):
        (<div>{<Link to='/'>Go back to Login</Link>}</div>)}
        
    </div>
  )
}

export default DoctorAccount