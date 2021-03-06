import React,{useState,useEffect} from 'react'
import {useNavigate, Navigate, Link} from 'react-router-dom'
import {useFormik} from 'formik'
import axios from "axios"
import '../CSS/DoctorLogin.css'



function DoctorLogin() {
    const [emailmsg, setEmailmsg]=useState(false)
    const [passwordmsg, setPasswordmsg]=useState(false)
    const [emailflag, setEmailFlag]=useState(false)
    const [passflag, setPassFlag]=useState(false)
  
    const navigate=useNavigate()
    const initialValues={
        Email:"",
        Password:""
    }
    
    const onSubmit=(values)=>{
        console.log("Form data", values);
        fetch("/Docpost",{
            method:'POST',
            mode:'no-cors',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then(res=>{
            console.log(res)
            return res.json()
            
        }).then(data=>{
            console.log(data)
            if(data['msg']=='Doctor Authenticated'){
                localStorage.setItem('Doc_id',"d"+data['id']);
                navigate('/doctorcontrol', {state:{id:"d"}})
                
            }else{
                console.log("Some Problem Occured")
                if(data['msg']=='Doctor Not Found'){
                    setEmailmsg(true)
                    setEmailFlag(true)
                    setTimeout(() => {
                        setEmailFlag(false)
                    }, 5000)
                }
                if(data['msg']=='Invalid Password'){
                    setPasswordmsg(true)
                    setPassFlag(true)
                    setTimeout(() => {
                        setPassFlag(false)
                    }, 5000)
                }
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }


    
    const validate=(values)=>{
        let errors={}
        if(!values.Email){
            errors.Email="Required"
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)){
            errors.Email="Invalid Format"
        }
        
        if(!values.Password){
            errors.Password="Required"
        }
       
        return errors
    }
    
    const formik=useFormik({
        initialValues,
        onSubmit,
        validate
    })
  return (
    <div>
         <main className="form-signin">
           
           <form onSubmit={formik.handleSubmit}>
            
             <h1 className="h3 mb-3 fw-normal">Sign In As Doctor</h1>
         
             <div className="form-floating">
               <input type="email" name="Email" className="form-control" id="floatingInput" 
               placeholder="name@example.com"  onChange={formik.handleChange} 
               value={formik.values.Email}  onBlur={formik.handleBlur}/>
               <label htmlFor="floatingInput">Email Address</label>
               {formik.touched.Email && formik.errors.Email ? (<div className='error_msg'>{formik.errors.Email}</div>):null}
               {emailflag ? (<div className='error_msg'>Incorrect Email</div>):null}
             </div>
         
             <div className="form-floating">
               <input type="password" name="Password" className="form-control" id="floatingPassword"
                placeholder="Password" onChange={formik.handleChange} 
                value={formik.values.Password}  onBlur={formik.handleBlur}/>
               <label htmlFor="floatingPassword">Password</label>
               {formik.touched.Password && formik.errors.Password ? (<div className='error_msg'>{formik.errors.Password}</div>):null}
               {passflag ? (<div className='error_msg'>Incorrect Password</div>):null}
             </div>
         
             
             <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
             <p className="mt-5 mb-3 text-muted">&copy; 2022-2024</p>
           </form>
         </main>
         <Link to={"/forgotPassword"} state={{id:"d"}} className='forgot-password'>Forgot Password</Link>
         <br></br>
            <Link to="/adminLogin" className='admin-login'>Login as Admin</Link>
           </div>
    
  )
}

export default DoctorLogin