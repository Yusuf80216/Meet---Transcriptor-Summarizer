import React, { useRef } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router';
import userLogo from '../assets/user-pfp.jpg'
import {VscAccount } from 'react-icons/vsc'
import {CgLogOut } from 'react-icons/cg'
{/* <VscAccount/> */}
const Account = () => {

  const dropDownData = [
    // 'Profile' ,'Checkout','My Account','Logout'
    {
      id:1,
      name:'Logout',
      image:'CgLogOut',
    },
    // {
    //   id:2,
    //   name:'Logout',
    //   image:'VscAccount',
    // },
  
  ];
  const imgRef = useRef();
  const menuRef = useRef();
  const {user , logout,username } = UserAuth();
  const navigate = useNavigate();
  const handleLogout=async(e)=>{
    try {
      await logout();
      navigate('/signup')
      console.log('you are logged out');
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
        <div ref={menuRef} className='bg-[#F2F3F7] dropDown flex flex-col absolute z-[999] right-3  p-4 w-[330px] min-h-[190px] top-[3.2rem] shadow-md rounded-lg'>
            <ul className='flex flex-col justify-between h-full'>
              <div className=' flex flex-row items-center'>
                <div className=''>
                  <img src={userLogo} alt="" className='w-[50px] h-[50px] rounded-full cursor-default' />
                </div>
                <div className='flex flex-col p-2 my-3 justify-center'>
                {
                  user ? (
                    <>
                      <h1>{user.displayName}</h1>
                    </>
                  ) : (
                    username ? username : <h1>SORRY</h1>
                  )
                }
                    {/* <h1>
                      {
                        user ? user.displayName : (username && username)
                      }
                    </h1> */}
                    {/* {
                        <h1 className='font-semibold text-[#5B5B5D]'>
                          {username && username}
                        </h1>
                    } */}
                    
                    <p className='text-[#979797]'>{user && user.email}</p>
                </div>
              </div>
              {
                  dropDownData.map((curelem)=>{
                      return(
                          <>
                              <div className='drop-items  flex flex-col justify-end items-center'>
                                  {/* <li className='p-2 text-sm cursor-pointer rounded'>{curelem.}</li> */}
                                  <button className='w-full bg-[#272626] hover:bg-[#3b3a3a] p-2 rounded-lg text-white' onClick={handleLogout}>{curelem.name}</button>                                         
                              </div>
                          </>
                      )
                  })
              }
            </ul>
        </div>
    </>
  )
}

export default Account