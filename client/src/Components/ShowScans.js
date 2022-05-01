import React,{useState,useEffect} from 'react'

function ShowScans() {

    const [gif, setGif]=useState(null)

    
    useEffect(()=>{
        console.log("in showscan")
        fetch("/sendScan")
        .then(res=>{
            console.log("res",res)
            return res.blob()
        })
        .then(imageBlob=>{
            console.log(imageBlob)
            const imageObjecturl=URL.createObjectURL(imageBlob);
            setGif(imageObjecturl)
            
        })




    },[])

  return (
    <div>
        <h1>Scans</h1>
        <img className='gif' id='gif' src={gif}></img>
    </div>
  )
}

export default ShowScans