import React from 'react'
import Navbar from './Navbar'
import homeContent from '../assets/HomeContent.jpg'
const BodySection = () => {
  return (
    <>

        <div className='home-bodySection text-[#1e1d22] relative'>
            {/* main title */}
            <div className='flex justify-center mt-16 lg:mt-[6.1rem] font_title_bold text-center z-[5]'>
                <h1 className='text-4xl lg:text-[4.8rem] line-height cursor-default helvetica-bold'>Get your Meeting Summary<br/>in <span className='text-[#7465d5]'>Minutes.</span></h1>
            </div>
            {/* <div className='absolute z-[0] w-[60%] h-[35%] black__gradient top-0 left-[30%] lg:left-[30%]'/> */}
            <div className='absolute z-[1] w-[80%] h-[200px] top-0 left-[11%] blue__gradient md:bottom-0' />
            {/* <div className='absolute z-[1] w-[60%] h-[100%] green__gradient right-0 md:bottom-0'/> */}
            <div className='flex flex-col justify-center pt-10 text-2xl text-center'>
                <p className='mx-auto cursor-default text-center font_paragraph_regular text-[#676767] relative z-10 max-w-sm lg:max-w-full leading-relaxed'>MeetMinute provides accurate and concise summaries of important meetings,<br/>lectures, and debates. Our experienced team delivers essential information in just a few minutes, saving you time and keeping you informed.</p>
                <button className='relative z-10 flex justify-center font_paragraph_regular mt-12 w-fit mx-auto px-12 py-3 text-white transition-all hover:transition-all bg-[#715df8] hover:bg-[#8573f8] text-base rounded-md'>Start for free</button>
            </div>
            {/* 2nd Content */}
        </div>
            <section className='mt-16'>
                <div className='bg-[#EDF1F4] p-8 rounded-3xl'>
                    <img src={homeContent} alt=""  className=''/>
                </div>
            </section>
    </>
  )
}

export default BodySection