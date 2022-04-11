import React, { useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import Patients from './Patients'
import '../CSS/AdminControl.css'
import {useNavigate, Link} from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'

function AdminControl() {
    const navigate=useNavigate()

    useEffect(()=>{
console.log("In AdminControl")
    },[])

const handlePatientAdd=()=>{
    navigate('/addpatient')

}


  return (
    <div>
        <AdminNavbar nameOf='patients'></AdminNavbar>
        <h1 className='heading_patients'>Patients</h1>
        
        <button className='add btn btn-primary' onClick={handlePatientAdd}><AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus> Add</button>
        <Patients></Patients>
    </div>
  )
}

export default AdminControl