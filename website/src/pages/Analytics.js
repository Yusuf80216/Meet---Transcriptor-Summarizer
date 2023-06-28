import React, { useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import userLogo from '../assets/user-pfp.jpg'
import { IoIosArrowDown } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { RxNotionLogo } from 'react-icons/rx'
import Account from '../components/Account'


const Analytics = () => {
  const [showDropDown , setShowDropDown] = useState(false);
  const imgRef = useRef();
  const menuRef = useRef();
  const dropDownData = ['Profile' ,'Checkout','My Account','Logout']

  window.addEventListener("click",(e)=>{
    console.log('Haa bhai', e.target === menuRef.current);
    //  if(e.target !== menuRef.current){
    //     setShowDropDown(false);
    //  }
  })
  return (
    <>
        <div className='flex md:flex-row flex-col w-full h-full bg-[#F2F3F7]'>
            <Sidebar/>
            {/* bg-[#F2F3F7] => greyish */}
            {/* bg-[#fdfdfd] => White */}
            <div className='analytics-grid-layout'>

                <div className='analytics-header'>
                  <div className='hidden md:flex justify-end items-center border-b w-full h-[70px] py-5 bg-[#F2F3F7] shadow-sm space-x-4 pr-4'>
                      <div className='flex items-center gap-2 relative'>
                          {/* <div className='pr-10'>
                            <h1>Try our new Extension !</h1>
                          </div> */}
                          <div>
                              <img src={userLogo} alt="" className='w-full h-full rounded-full cursor-default' />
                          </div>
                          <div className='flex items-center gap-2'>
                              <IoIosArrowDown size={20} className='text-[#adadad] cursor-pointer' onClick={()=>setShowDropDown(!showDropDown)}/>
                          </div>

                          {/* DropDown Profile */}
                          {
                              showDropDown ? (
                                  <>
                                      <Account/>
                                  </>
                              ) : null
                          }
                      </div>
                      </div>
                </div>
                {/* text-[#7465d5] */}
                <div className='analytics-main cursor-default'>
                    <div className='analytics-main-landing m-4 rounded-3xl'>
                        <div className='analytics-extension-footer flex gap-2 items-center mx-8 mt-4 rounded-full border border-[#afabab] p-4'>
                            <Link to={'https://chrome.google.com/webstore/category/extensions'}><h1>Try out our extension</h1></Link>
                            <FiArrowUpRight/>
                        </div>
                        <div className='px-20 flex flex-col justify-center text-left h-full analytics__gradient rounded-3xl font-sans border border-[#dfdbdb]'>
                            <p className='font-bold text-xl text-[#1d1b1b] pt-2'>Welcome User,</p>
                            <h1 className='font-bold text-6xl leading-[4rem] text-[#1d1b1b]'>Effortlessly Summarize Your<br/>Online Meetings with Our Tool.</h1>
                        </div>
                    </div>
                    <div className='analytics-main-content m-4 rounded-3xl border border-[#dfdbdb] p-3'>
                        <div className='analytics-main-content-left rounded-3xl'>
                            <div className='analytics-main-content-left-top h-full'>
                                <div className='bg-[#c7eaf5] rounded-3xl flex flex-col items-center justify-center gap-2'>
                                    <div className=''>
                                        <h1 className='font-semibold text-2xl'>1</h1>
                                    </div>
                                    <div className=''>
                                        <h1 className='font-semibold text-xl font-sans'>My Meetings</h1>
                                    </div>
                                </div>
                                <div className='text-white bg-[#2c2b2b] rounded-3xl flex flex-col items-center justify-center gap-2 h-full'>
                                    <div className=''>
                                        <h1 className='font-semibold text-2xl'>1</h1>
                                    </div>
                                    <div className=''>
                                        <h1 className='font-semibold text-xl font-sans'>Shared with me</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='analytics-main-content-left-bottom '>
                                <div className='flex gap-2 rounded-3xl border border-[#afabab] bg-[#fffde4] h-full items-center justify-center font-bold'>
                                    <RxNotionLogo className='w-[24px] h-[24px]'/>
                                    <h1 className='text-lg flex items-center gap-2 text-[#4f99b9]'>New Feature ! Now, you can add summary to Notion.<FiArrowUpRight/></h1>
                                </div>
                            </div>
                        </div>
                        
                        <div className='analytics-main-content-right bg-[#dfe3ee] rounded-3xl'>
                              <div className=' px-20 flex flex-col justify-center  h-full rounded-3xl'>
                                    <div className='flex gap-2 items-center'>
                                        <h1>Meet</h1>
                                        <div className='bg-gray-600 h-[20px] w-full'>

                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <h1>Zoom</h1>
                                        <div className='bg-gray-600 h-[20px] w-full'>

                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <h1>Teams</h1>
                                        <div className='bg-gray-600 h-[20px] w-full'>

                                        </div>
                                    </div>
                              </div>
                        </div>  
                    </div>
                </div>
            
            </div>
        </div>
    </>
  )
}

export default Analytics