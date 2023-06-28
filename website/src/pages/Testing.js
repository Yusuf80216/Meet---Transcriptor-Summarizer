import React, { useState } from 'react'

const Testing = () => {
    const [name , setName] = useState("");
    const [data,setData] = useState("");
    // const [mobile , setMobile] = useState("");
    const handleUpload = (e)=>{
        let dataItem = {name , data};
        e.preventDefault();
        fetch("https://api.restful-api.dev/objects",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataItem)
        }).then((result)=>{
            console.warn('Result',result)
        })
    }
  return (
    <>
        <h1 className='text-white'>Testing</h1>
        <form onSubmit={handleUpload}>
            <input type='text' placeholder='Enter the name :' className='p-4' onChange={(e)=>setName(e.target.value)}/>
            <input type='text' placeholder='Enter the data :' className='p-4' onChange={(e)=>setData(e.target.value)}/>
            <button className='p-4 bg-red-500'>Send</button>
        </form>
    </>
  )
}

export default Testing