import React from 'react'
import {BiUserCircle} from 'react-icons/bi'
import {FaRegUserCircle, FaUserAlt} from 'react-icons/fa'
const Transcript = ({speaker,dialogue,time}) => {

  return (
    <>
        <div className='grid-right-transcript-left flex gap-4'>
            <div className='flex items-center h-fit gap-3 pt-1'>
                <FaRegUserCircle className='text-[#575757] w-[24px] h-[24px]'/>
                <h1 className='font-normal text-[#4d4949] text-[19px]'>{speaker.charAt(0).toUpperCase() + speaker.slice(1).toLowerCase()}</h1>
            </div>
        </div>
        <div className='grid-right-transcript-right flex flex-col gap-8'>
            <p className='text-lg text-[#a5a2a2] pt-1'>{time}</p>
            <p className='leading-9 text-[#696464]'>{dialogue}</p>
        </div>
        {/* <div className='grid-right-transcript'>
            <div className='pl-12 grid-right-transcript-left flex gap-4 pt-4'>
                <BiUserCircle className='w-[30px] h-[30px]'/>
                <h1 className=''>{speaker}</h1>
            </div>
            <div className='grid-right-transcript-right pt-4 flex flex-col gap-8'>
                <p className='text-2xl'>{time}</p>
                <p className='leading-9'>{dialogue}</p>
            </div>
        </div> */}
    </>
  )
}

export default Transcript