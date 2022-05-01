import React,{useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import DoctorNavbar from './DoctorNavbar'
import '../CSS/UploadScan.css'

function UploadScan() {
    const [file, setFile]=useState(null)
    const [flag, setFlag]=useState(false)
    const ref=useRef(null)
    const navigate=useNavigate()


  const imagehandler=(event)=>{
    const reader = new FileReader();
    setFile(event.target.files[0])
    reader.onload =()=>{
      if(reader.readyState === 2){
        
      }

    }

    
    

    reader.readAsDataURL(event.target.files[0])

  }

  console.log("file",file)
  if(file){
    console.log("slice",file.name.slice(-7))
    if(file.name.slice(-7)===".nii.gz"){
      console.log("correct")
    }else{
      console.log("wrong format")
      setFile(null)
      setFlag(true)
    }
  }

const handleSubmit=(event)=>{

    const formdata = new FormData()
    formdata.append("scan", file)
    if(file!=null){
      fetch("/uploadScan",{
        method:"POST",
        mode:"no-cors",
        headers:
        {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:formdata

    })
    .then(res=>{
        console.log("res",res)
        return res.json()
    })
    .then(data=>{
        console.log(data)
        if(data['msg']=='Success'){
          navigate('/showscans')
        }
    })
    }
    
}

  return (
    <div className='mydiv'>
      <DoctorNavbar nameOf="patients"></DoctorNavbar>
      <h2>Upload</h2>
      <div className='msgdiv'>
        { flag ? <h3 className='error_msg heading_uploadscan'>Wrong Format</h3>:<h3 className='heading_uploadscan'>Nii File</h3>}
      </div>
         <input type='file' className='image-input' ref={ref} name='photo' onChange={imagehandler} hidden></input>
         <button type='button' className='btn btn-secondary upload' onClick={()=>{
           ref.current.click()
         }}>Upload</button>
         <br></br>
         <button type='submit' className='submit btn btn-primary' onClick={handleSubmit}>Submit</button>
         
    </div>
  )
}

export default UploadScan