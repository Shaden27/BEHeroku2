import React,{useEffect, useState} from 'react'
import DoctorDashboard from './DoctorDashboard'
import {Link} from 'react-router-dom'
import '../CSS/patients.css'

function Patients() {

  const [flag, setFlag]=useState(false)
  const [data, setData]=useState([{}])
  const [hover, setHover]=useState(false)

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


  // function handleHover(id){
  //   // console.log("In handle hover", event.target)
  //   // setHover(true)
  //   let ele=document.getElementById(id)
  //   console.log(id)
  
  // }

  // function handleHoverOut(id){
  //   // setHover(false)
   
  // }

  return (
    <div>
        <DoctorDashboard nameOf='patients'></DoctorDashboard>
        {flag ? <div> 
          <h1>Patients</h1>
          <div className='container'>
          {(typeof data === "undefined") ? <div>Loading!!!</div>:data.map((patient,i)=>
           <Link className='link' to='/actualpatient' key={i}>
            <div className='row' id={i} onMouseEnter={()=>{
              console.log("i",i)
              console.log(i)
              let ele=document.getElementById(i)
              console.log("ele",ele)
              ele.classList.add('hover')
               
            }} onMouseLeave={()=>{
              let ele=document.getElementById(i)
              ele.classList.remove('hover')
               console.log(i)
            }}>
            <div className="col-sm-8" >
            <h3 className='patient'>Name:</h3>
             <h3 className='patient'>{patient.name}</h3>
            </div>
            <div className="col-sm-4" >
              <h3 className='patient'>Email:</h3>
              <h3 className='patient'>{patient.email}</h3>
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