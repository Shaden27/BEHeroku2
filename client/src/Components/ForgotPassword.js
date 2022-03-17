import React,{useState,useEffect} from 'react'
import {useFormik} from 'formik'
import {useNavigate, useLocation} from 'react-router-dom'

function ForgotPassword() {
   
    
    const [errorflag, setErrorFlag]=useState(false)
    const [noaccountflag, setNoAccountFlag]=useState(false)
    const {id}=useLocation().state

  
    const navigate=useNavigate()
    const initialValues={
        Email:""
    }

    const validate=(values)=>{
        let errors={}
    
        if(!values.Email){
            errors.Email="Required"
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)){
            errors.Email="Invalid Format"
        }
       
        return errors
    }

const onSubmit=(values)=>{
    const id_obj={
        "id":id
    }
    const data=[values,id_obj]
    console.log(JSON.stringify(data))
    fetch("/forgotPassword",{
        method:"POST",
        mode:"no-cors",
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>{
        console.log("res",res)
       return res.json()
    })
    .then(data=>{
        console.log(data)
        if(data["msg"]=="Otp sent Successfully"){
        navigate("/otp", {state:{"id":id}})
        }else{
           if(data["msg"]=="Account Not Found"){
                setErrorFlag(true)
               setNoAccountFlag(true)
                setTimeout(() => {
                    setNoAccountFlag(false)
                    setErrorFlag(false)
                }, 5000)
            }
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
        <main className='form-signin'>
        <form onSubmit={formik.handleSubmit}>
            <div className='form-floating'>
            <input type="email" name="Email" className="form-control" id="floatingInput" 
               placeholder="name@example.com"  onChange={formik.handleChange} 
               value={formik.values.Email}  onBlur={formik.handleBlur}/>
               <label htmlFor="floatingInput">Email Address</label>
               {formik.touched.Email && formik.errors.Email ? (<div className='error_msg'>{formik.errors.Email}</div>):null}
               
               {errorflag ? (<div className='error_msg'>No Account Found</div>):null}
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form> 
            
         </main>
    </div>
  )
}

export default ForgotPassword