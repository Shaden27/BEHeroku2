import React,{useState, useEffect} from 'react'
import {useNavigate,Navigate,Link} from 'react-router-dom'
import DoctorSidebar from './DoctorSidebar'
import '../CSS/Dashboard.css'


function DoctorNavbar(props) {
  const navigate=useNavigate()
  const nameOf=props.nameOf
  console.log(nameOf)
  console.log("In DoctorNavbar")

  
  const [classflag, setClassFlag]=useState(false)

 
  useEffect(()=>{
    
      if (nameOf=='patients'){
        setClassFlag(false)
      }else if(nameOf=='doctorAccount'){
        setClassFlag(true)
      }

  }, [])

  const handleLogout=()=>{
    console.log("Logging out")
    localStorage.removeItem('Doc_id')
    navigate('/')

}

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
   <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
      <Link to={"/doctorcontrol"} state={{id:"d"}} className={classflag ? "nav-link":"nav-link active"}>Patients</Link>
      </li>
      <li className="nav-item ">
        <a className={classflag ? "nav-link active":"nav-link"} href="/doctorAccount">Account</a>
      </li>
    </ul>
    <form className="form-inline input-group my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>

    <button className='btn btn-primary btn-large' onClick={handleLogout}>Logout</button>
  </div>
</nav>
            
    </div>
  )
}

export default DoctorNavbar