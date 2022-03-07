import React,{useState, useEffect} from 'react';
import { Link,useNavigate,Navigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from './SidebarData'
import '../CSS/DoctorSidebar.css'
import {IconContext} from 'react-icons'

function DoctorSidebar() {
  const navigate=useNavigate()
    const [sidebar, setSidebar]=useState(false)
    const [flag, setFlag]=useState(false)

    const showSidebar=()=>{
        setSidebar(!sidebar)
    }

    useEffect(()=>{
      if(localStorage.getItem('id')){
            console.log("Local storage exists")
            setFlag(true)
          }

    },[])
 

  return (  
    <div>
      {flag ? (
        <React.Fragment>
          <IconContext.Provider value={{color:'#fff'}}>
          <div className='sidebar'>
            <Link to="#"  className='menu-bars'></Link>
      <FaIcons.FaBars onClick={showSidebar}></FaIcons.FaBars>
      {/* <h2 className='heading'>Welcome to Prime </h2> */}
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars'></Link>
                    <AiIcons.AiOutlineClose/>
                </li>
                {SidebarData.map((item, index)=>{
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
          </nav>
          </IconContext.Provider>
      </React.Fragment>):(<div>{<Link to='/'>Go back to Login</Link>}</div>)
}
      
    </div>
    )
  
}

export default DoctorSidebar

{/* <Navigate replace to='/'></Navigate> */}