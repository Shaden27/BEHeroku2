import React,{useState,useEffect} from 'react'

function ShowScans() {

    const [inputgif, setInputGif]=useState(null)
    const [outputgif, setOutputGif]=useState(null)

    
    useEffect(()=>{
        console.log("in showscan")
        const formdata1 = new FormData()
        formdata1.append('type', 'input')
        fetch("/sendScan",{
            method:"POST",
            mode:"no-cors",
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json/multipart/form-data'
            },
            body:formdata1
        })
        .then(res=>{
            console.log("res",res)
            return res.blob()
        })
        .then(imageBlob=>{
            console.log(imageBlob)
            const imageObjecturl=URL.createObjectURL(imageBlob);
            setInputGif(imageObjecturl)
            
        })

        const formdata2= new FormData()
        formdata2.append('type', 'output')
        fetch("/sendScan",{
            method:"POST",
            mode:"no-cors",
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json/multipart/form-data'
            },
            body:formdata2
        })
        .then(res=>{
            console.log("res",res)
            return res.blob()
        })
        .then(imageBlob=>{
            console.log(imageBlob)
            const imageObjecturl=URL.createObjectURL(imageBlob);
            setOutputGif(imageObjecturl)
            
        })


    },[])

  return (
    <div>
        <h1>Scans</h1>
        <img className='gif' id='inputgif' src={inputgif}></img>
        <img className='gif' id='outputgif' src={outputgif}></img>
    </div>
  )
}

export default ShowScans