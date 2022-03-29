
import React,{useState,useEffect} from 'react'
import {useNavigate,Navigate,Link} from 'react-router-dom'
import DoctorDashboard from '../Components/DoctorDashboard'

function DoctorAccount() {
    const [flag, setFlag]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('Doc_id')){
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
       <DoctorDashboard nameOf='doctorAccount'></DoctorDashboard>
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