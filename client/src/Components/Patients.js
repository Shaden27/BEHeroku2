import React,{useEffect, useState} from 'react'
import DoctorNavbar from './DoctorNavbar'
import {Link, useLocation} from 'react-router-dom'
import '../CSS/patients.css'
import AdminNavbar from './AdminNavbar'
import '../CSS/AdminControl.css'

function Patients() {

  const {id}=useLocation().state
  const [flag, setFlag]=useState(false)
  const [data, setData]=useState([{}])
  
  
  console.log("id",id)  

  useEffect(()=>{
    let mounted=true;
    let idToBeSent;
    if (id == "d"){
      if(localStorage.getItem('Doc_id')){
        idToBeSent=localStorage.getItem('Doc_id')
        console.log("Local storage exists")
        setFlag(true)
      }
    }else{
      if(localStorage.getItem('Admin_id')){
        idToBeSent=localStorage.getItem('Admin_id')
        console.log("Local storage exists")
        setFlag(true)
      }
    }
   
    const formdata=new FormData()
    formdata.append('id', idToBeSent)
      fetch("/getPatients",{
        method:'POST',
        mode:'no-cors',
        headers:{
          'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:formdata
      })
      .then(res=>{
        console.log(res)
        return res.json()
      })
      .then(data=>{
        console.log("data",data)
        if(mounted){
        if(data['patients'] == 'Not Found'){
          setData(new Array(0));
        }else{
          setData(data)
        }
      
        console.log("num of patients",data.length)
        console.log(typeof data)
        }
      })

    return () => mounted=false
   
  },[])

  return (
    <div>
        {flag ? <div> 
          <div className='container containerPatient'>
          {(data.length === 0) ? <div><h2>No Patients</h2></div> :<div>{data.map((patient,i)=>
           <Link className='link' to='/actualpatient' key={i}>
            <div className='row rowPatient' id={i} onMouseEnter={()=>{
              let ele=document.getElementById(i)

              ele.classList.add('hover')
               
            }} onMouseLeave={()=>{
              let ele=document.getElementById(i)
              ele.classList.remove('hover')
              
            }}>
            <div className="col colPatient" >
           
             <h3 className='patient'>Name: {patient.name}</h3>
            </div>
            <div className="col colPatient" >
              <h3 className='patient'>Email: {patient.email}</h3>
            </div>
            </div>
            </Link>
           
            
          )}</div>}

          </div>
         
        </div>
        :<div>{<Link to='/'>Go back to Login</Link>}</div>}
        
          
       
        </div>
  )
}

export default Patients

// 