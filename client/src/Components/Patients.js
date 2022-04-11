import React,{useEffect, useState} from 'react'
import DoctorNavbar from './DoctorNavbar'
import {Link, useLocation} from 'react-router-dom'
import '../CSS/patients.css'
import AdminNavbar from './AdminNavbar'

function Patients() {

  const {id}=useLocation().state
  const [flag, setFlag]=useState(false)
  const [data, setData]=useState([{}])
  const [hover, setHover]=useState(false)
  const [getid, setGetId]=useState(false)
  
  console.log("id",id)  

  useEffect(()=>{
    let mounted=true;
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
        if(mounted){
        setData(data)
        }
      })

    return () => mounted=false
   
  },[])

  useEffect(()=>{
   
    if(id == "d"){
      console.log("Rendering patients for doctor")
      setGetId(true)
    }

  },[])

  return (
    <div>
     
        {/* {getid ?<DoctorNavbar nameOf='patients'></DoctorNavbar>:<AdminNavbar nameOf='patients'></AdminNavbar>} */}
        {flag ? <div> 
          <div className='container'>
          {(typeof data === "undefined") ? <div>Loading!!!</div>:data.map((patient,i)=>
           <Link className='link' to='/actualpatient' key={i}>
            <div className='row' id={i} onMouseEnter={()=>{
              let ele=document.getElementById(i)

              ele.classList.add('hover')
               
            }} onMouseLeave={()=>{
              let ele=document.getElementById(i)
              ele.classList.remove('hover')
              
            }}>
            <div className="col" >
           
             <h3 className='patient'>Name: {patient.name}</h3>
            </div>
            <div className="col" >
              <h3 className='patient'>Email: {patient.email}</h3>
            </div>
            </div>
            </Link>
           
            
          )}
          </div>
         
        </div>
        :<div>{<Link to='/'>Go back to Login</Link>}</div>}
        
          
       
        </div>
  )
}

export default Patients

// 