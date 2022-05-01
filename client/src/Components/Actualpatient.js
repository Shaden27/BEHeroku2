import React,{useState,useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import DoctorNavbar from './DoctorNavbar'
import '../CSS/ActualPatient.css'

function Actualpatient() {
  const navigate=useNavigate()
  const {id}=useLocation().state
  const [patientdata, setPatientData]=useState({})
  const [patientphoto, setPatientPhoto]=useState(null)


  useEffect(()=>{
    let mounted=true;
    const obj={
      id:id,
      forwhat:"otherInfo"
    }
    fetch("/getPatientInfo",{
      method:"POST",
      mode:"no-cors",
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    .then(res=>{
      console.log("res1",res)
      return res.json()
    })
    .then(data=>{
      console.log("data",data)
        setPatientData(data)
        
    })

    const obj1={
      id:id,
      forwhat:"photo"
    }
    fetch("getPatientInfo",{
      method:"POST",
      mode:"no-cors",
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json/multipart/form-data'
      },
      body:JSON.stringify(obj1)
    })
    .then(res=>{
      console.log("res2",res)
      return res.blob()
      
    })
    .then(imageBlob=>{
      const imageObjecturl=URL.createObjectURL(imageBlob);
      setPatientPhoto(imageObjecturl)
    })

    return () => mounted=false

  },[])
  console.log("id in actualPatient",id)

  const handleNewScan=(event)=>{
    console.log(event.target)
    navigate('/uploadscan')
    

  }
  
  
  return (
    <div>
      {/* <img src={patientphoto} width='100px' height='100px'></img>
      <h2>{patientdata.name}</h2>
      <h2>{patientdata.email}</h2>
      <h2>{patientdata.contact}</h2> */}
       <DoctorNavbar nameOf="patients"></DoctorNavbar>
       <div className='page'>
       <h1 className='title'>Profile</h1>
      <div className='container containerPatientPage'>
      <div className='row rowPatientPhoto'>
        <div className='col-sm'>
          <img className='photo' src={patientphoto} width='150px' height='150px'></img>
        </div>
      </div>

      <div className='row nameAndEmail'>
        <div className='col-sm'>
          <h2 className='name'>Name: {patientdata.name}</h2>
        </div>

        <div className='col-sm'>
          <h2 className='email'>Email: {patientdata.email}</h2>
        </div>

      </div>

      <div className='row contactAndDoctor'>
        <div className='col-sm'>
          <h2 className='contact'>Contact:  +91 {patientdata.contact}</h2>
        </div>

        <div className='col-sm'>
          <h2 className='doc_email'>Doctor:  {patientdata.doctor_email}</h2>
        </div>
      </div>

        <div className='row rowNewScan'>
        <div className='col-sm'>
          <button type='button' className='btn btn-primary uploadscan' onClick={handleNewScan}>New Scan</button>
        </div>

        </div>
      

      </div>
       </div>
      
     
    </div>
  )
}

export default Actualpatient
