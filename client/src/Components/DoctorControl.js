import React from 'react'
import DoctorNavbar from './DoctorNavbar'
import Patients from './Patients'

function DoctorControl() {
  return (
    <div>
        <DoctorNavbar nameOf="patients"></DoctorNavbar>
        <h1 className='heading_patients'>Patients</h1>
        <Patients id="d"></Patients>
    </div>
  )
}

export default DoctorControl