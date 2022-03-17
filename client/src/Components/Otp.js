import React, { useState } from 'react'
import {useFormik} from 'formik'
import {useNavigate, useLocation} from 'react-router-dom';

function Otp() {
    const [errorflag, setErrorFlag]=useState(false)
    const {id}=useLocation().state
    const navigate=useNavigate()

    const initialValues={
        user_otp:""
    }

    const validate=(values)=>{
        let errors={}
        if(!values.user_otp){
            errors.user_otp="Required"
        }
        return errors
    }

    const onSubmit=(values)=>{
        const id_obj={
            "id":id
        }
       const data=[values, id_obj]
        fetch("/getOtp",{
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
            console.log(data)
            if(data["msg"]=="Password Updated Successfully"){
                navigate("/passwordresetsuccess")
            }else{
                if(data["msg"]=="Invalid Otp"){
                    setErrorFlag(true)
                    setTimeout(() => {
                        setErrorFlag(false)
                    }, 5000)
                }
            }
        })
        .then(err=>{
            console.log(err)
        })
    }
    const formik=useFormik({
        initialValues,
        onSubmit,
        validate
    })

  return (
    <div>
        <main className='form-signin'>
            <form onSubmit={formik.handleSubmit}>
            <div className="form-floating">
                    <input type="text" name="user_otp" className="form-control" id="floatingOtp"
                    placeholder="user_otp" onChange={formik.handleChange} 
                    value={formik.values.user_otp}  onBlur={formik.handleBlur}></input>
                    <label htmlFor="floatingOtp">Otp</label>
                    {formik.touched.user_otp && formik.errors.user_otp ? (<div className='error_msg'>{formik.errors.user_otp}</div>):null}
                    {errorflag ? (<div className='error_msg'>Invalid Otp</div>):null}
            </div>
             <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form> 
        </main>
    </div>
  )
}

export default Otp