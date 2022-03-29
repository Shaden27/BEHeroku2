import React,{useEffect, useState} from 'react'
import DoctorDashboard from './DoctorDashboard'
import {Link} from 'react-router-dom'

function Patients() {

  const [flag, setFlag]=useState(false)
  const [data, setData]=useState([{}])

  useEffect(()=>{
    if(localStorage.getItem('Doc_id')){
      console.log("Local storage exists")
      setFlag(true)
    }

    fetch("/getPatients")
    .then(res=>{
      console.log(res)
      return res.json()
    })
    .then(data=>{
      console.log("data",data)
      setData(data)
    })

  },[])

  return (
    <div>
        <DoctorDashboard nameOf='patients'></DoctorDashboard>
        {flag ? <div> 
          <h1>Patients</h1>
          {data.map((patient,i)=>
            <h2 key={i}>{patient.name}</h2>
          )}
        </div>
        :<div>{<Link to='/'>Go back to Login</Link>}</div>}
       
        </div>
  )
}

export default Patients