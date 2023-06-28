import React, { useState } from 'react'
import tickmark from '../assets/tickmark.png'
const AddSpeaker = ({onclick,count}) => {
    
  return (
    <>
        <div className='flex w-[20] flex-wrap'>
            <input type='text' placeholder={`Enter Speaker ${count}`} className='bg-[#272727] rounded-md' />
            <img src={tickmark} className='w-10' onClick={onclick}/>
        </div>
    </>
  )
}

export default AddSpeaker