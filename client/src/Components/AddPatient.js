import React,{useState,useEffect, useRef} from 'react'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import '../CSS/AddPatient.css'

function AddPatient() {
  const [profileImg, setProfileImg]=useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const [file, setFile]=useState(null)
  const imageRef=useRef(null)
  const navigate=useNavigate()
      const initialValues={
        Name:"",
        Email:"",
        Doctor_Email:"",
        Contact:""
    }


    const onSubmit=(values)=>{
      const formdata=new FormData()
     
      formdata.append('Name', values.Name)
      formdata.append('Email', values.Email)
      formdata.append('Doctor_Email', values.Doctor_Email)
      formdata.append('Contact', values.Contact)
      formdata.append('Photo',file)
      console.log("formdata", formdata)
      console.log(formdata.get('file'))
        // console.log(profileImg)
        // console.log(values)
        // let data={
        //   Name:values.Name,
        //   Email:values.Email,
        //   Doctor_Email:values.Doctor_Email,
        //   Contact:values.Contact,
        //   Photo:formdata
        // }
        
        fetch("/addPatient", {
          method:"POST",
          mode:"no-cors",
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
          console.log(data)
          if (data['msg']=="Good"){
            console.log("success")
            navigate('/addPatientSuccess')
          }else{
            console.log("Something went wrong!!")
          }
        })

    }


    const validate=(values)=>{
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      let errors={}

      if(!values.Name){
      errors.Name="Required"
      }

      if(!values.Email){
        errors.Email="Required"
      }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)){
          errors.Email="Invalid Format"
      }

      if(!values.Doctor_Email){
        errors.Doctor_Email="Required"
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Doctor_Email)){
        errors.Doctor_Email="Invalid Format"
      }


      if(!values.Contact){
        errors.Contact="Required"
      }else{
        if(values.Contact.length < 10 || values.Contact.length > 10){
        errors.Contact="Enter complete Number"
        }
      if((specialChars.test(values.Contact)) || !(values.Contact.search(/[a-zA-Z]/)==-1)){
        errors.Contact="Invalid Contact"
      }

      console.log(values.Contact.search(/[a-zA-Z]/)==-1)
    }
      

      return errors

    }

    const imagehandler=(event)=>{
        const reader = new FileReader();
        setFile(event.target.files[0])
        reader.onload =()=>{
          if(reader.readyState === 2){
            setProfileImg(reader.result)
          }
        }

        reader.readAsDataURL(event.target.files[0])

    }
    const formik=useFormik({
      initialValues,
      onSubmit,
      validate
    })
  return (
    <div>
        <h2>Add a Patient</h2>
    
        
          <form onSubmit={formik.handleSubmit}>
          <div className='container containerAddPatient'>
          <div className='row row1'>
            <div className='col form-floating'>
            <input type="text" name="Name" className="form-control" id="floatingName"
                  placeholder="Name" onChange={formik.handleChange} 
                  value={formik.values.Username}  onBlur={formik.handleBlur}></input>
                 <label htmlFor="floatingName">Name</label>
                 {formik.touched.Name && formik.errors.Name ? (<div className='error_msg'>{formik.errors.Name}</div>):null}
            </div>

            <div className='col form-floating'>
            <input type="email" name="Email" className="form-control" id="floatingInput" 
               placeholder="name@example.com"  onChange={formik.handleChange} 
               value={formik.values.Email}  onBlur={formik.handleBlur}/>
               <label htmlFor="floatingInput">Email address</label>
               {formik.touched.Email && formik.errors.Email ? (<div className='error_msg'>{formik.errors.Email}</div>):null}
            </div>
            </div>

            <div className='row row2'>
              <div className='col form-floating'>
              <input type="text" name="Contact" className="form-control" id="floatingContact"
                  placeholder="contact" onChange={formik.handleChange} 
                  value={formik.values.Contact}  onBlur={formik.handleBlur}></input>
                 <label htmlFor="floatingUsername">Contact Number</label>
                 {formik.touched.Contact && formik.errors.Contact ? (<div className='error_msg'>{formik.errors.Contact}</div>):null}
              </div>

              <div className='col form-floating'>
              <input type="email" name="Doctor_Email" className="form-control" id="floatingDoctorEmail"
                  placeholder="Doctor's Email" onChange={formik.handleChange} 
                  value={formik.values.Doctor_Email}  onBlur={formik.handleBlur}></input>
                 <label htmlFor="floatingDoctorId">Doctor Email</label>
                 {formik.touched.Doctor_Email && formik.errors.Doctor_Email ? (<div className='error_msg'>{formik.errors.Doctor_Email}</div>):null}
              </div>

            </div>

            <div className='row row3'>
              <div className='col form-floating'>

                <div className='image-holder'>
                  <img className='img' id='img' src={profileImg} alt=""></img>
                </div>

              <input type='file' className='image-input' ref={imageRef} name='photo' accept='image/*' onChange={imagehandler} hidden></input>
              <button type='button' className='   btn btn-secondary' onClick={()=>{
                imageRef.current.click()
              }}>Upload Photo</button>

              </div>
{/* 
               <div className='col form-floating'>
                
              </div>  */}
             
            </div>

            <button type='submit' className='w-100 btn btn-lg btn-primary submit'>Submit</button>

            </div>
            </form>
           
          

       
      
       
    </div>
  )
}

export default AddPatient