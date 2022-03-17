import React,{useState,useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {useFormik} from 'formik'
import '../CSS/DoctorLogin.css'

function ResetPassword() {
    const [flag,setFlag]=useState(false)
    const [flagForLocalStorage, setFlagForLocalStorage]=useState(false)
    const navigate=useNavigate()
    const initialValues={
        oldPassword:"",
        newPassword:"",
        verifyPassword:""
    }

    useEffect(()=>{
        if(localStorage.getItem('Doc_id')){
            console.log("Local storage exists")
            setFlagForLocalStorage(true)
          }

    },[])
    const validate=(values)=>{
        let errors={}       
        
        if(!values.oldPassword){
            errors.oldPassword="Required"
        }
        if(!values.newPassword){
            errors.newPassword="Required"
        }else{
            if(values.newPassword.length < 10){
                errors.newPassword="Make sure Password is at least 10 characters long"
            }else{
                if(values.newPassword.search(/\d/)==-1){
                    errors.newPassword="Add a digit please"
                    console.log("hello from here")
                }
                if(values.newPassword.search(/[A-Z]/)==-1){
                    errors.newPassword="Add a capital letter please"
                    console.log("hello from there")
                }
                
            }
           
        }
        if(!values.verifyPassword){
            errors.verifyPassword="Required"
        }
        if(values.newPassword!=values.verifyPassword){
            setFlag(true)
        }else if(values.newPassword==values.verifyPassword){
            setFlag(false)
        }

        return errors
    }

    const onSubmit=(values)=>{
        console.log(values)
        const id=localStorage.getItem('id')
        const id_obj={
            "id":id
        }
        const data=[values,id_obj]
        fetch('/resetPassword', {
            method:"POST",
            mode:"no-cors",
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>{
            console.log(res)
            return res.json()
        })
        .then(data=>{
            if(data["msg"]=="Password updated successfully"){
                console.log("Password updated successfully")
                navigate('/doctordashboard')
            }else{
                console.log("something went wrong")
            }
           
        })
        .then(err=>console.log(err))

    }
    const formik=useFormik({
        initialValues,
        onSubmit,
        validate
    })

  return (
    <div>
        {flagForLocalStorage ?(<main className="form-signin">
        <form onSubmit={formik.handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Enter the new Password</h1>
        <div className="form-floating">
        <input type="password" name="oldPassword" className="form-control" id="floatingOldPassword"
                placeholder="Old Password" onChange={formik.handleChange} 
                value={formik.values.oldPassword}  onBlur={formik.handleBlur}/>
               <label htmlFor="floatingPassword">Old Password</label>
               {formik.touched.oldPassword && formik.errors.oldPassword ? (<div className='error_msg'>{formik.errors.oldPassword}</div>):null}
           </div> 

           <div className="form-floating">
        <input type="password" name="newPassword" className="form-control" id="floatingNewPassword"
                placeholder="New Password" onChange={formik.handleChange} 
                value={formik.values.newPassword}  onBlur={formik.handleBlur}/>
               <label htmlFor="floatingPassword">New Password</label>
               {formik.touched.newPassword && formik.errors.newPassword ? (<div className='error_msg'>{formik.errors.newPassword}</div>):null}
           </div> 

           <div className="form-floating">
        <input type="password" name="verifyPassword" className="form-control" id="floatingVerifyPassword"
                placeholder="Veriy Password" onChange={formik.handleChange} 
                value={formik.values.verifyPassword}  onBlur={formik.handleBlur}/>
               <label htmlFor="floatingPassword">Verify Password</label>
               {formik.touched.verifyPassword && formik.errors.verifyPassword ? (<div className='error_msg'>{formik.errors.verifyPassword}</div>):null}
               {flag ? (<div className='error_msg'>Password does not match</div>):null}
           </div> 

           <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={flag}>Submit</button>
        </form> 
        </main>): (<div>{<Link to='/'>Go back to Login</Link>}</div>)}
        


    </div>
  )
}

export default ResetPassword