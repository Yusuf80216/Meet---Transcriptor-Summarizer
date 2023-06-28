import React, { useState } from 'react'
import sitelogo from "../assets/Netflix_2015_logo.svg";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
    const [show, setShow] = useState(false);
  return (
    <>
        <div className="home-navbar text-black flex justify-between items-center text-xl md:text-2xl relative z-10">
            {/* m-3 lg:m-5 */}
          {/* <img src={sitelogo} alt="" className="w-28 mt-6" />  */}
          <p className='mt-6 text-2xl lg:text-3xl font_title_bold letter_spacing_regular cursor-pointer text-[#7465d5]'><Link to={'/'}>MeetMinute.</Link></p>
          <nav className="flex justify-center items-center my-auto text-lg">
          {/* hidden lg:flex */}
            <div className='flex items-center gap-4 mt-2'>
                <button className='px-7 py-2.5 bg-[#e3e1f0] text-[#7465d5] hover:bg-[#d7d6e2] transition-all duration-200 ease-linear helvetica-regular rounded-lg text-sm'><Link to={'/signin'}>Log in</Link></button>
                <button className='px-7 py-2.5 bg-[#715df8] hover:bg-[#8573f8] transition-all duration-200 ease-linear text-white helvetica-regular rounded-lg text-sm'><Link to={'/signup'}>Try for free</Link></button>
            </div>
            {/* <ul className="hidden lg:flex space-x-7 items-center justify-between font_paragraph_regular"> 
              <li className=' cursor-pointer'><Link to={'/'}>Home</Link></li>
              <li className=' cursor-pointer'><Link to={'/summarypage'}>Summary</Link></li>
              <li className=' cursor-pointer'><Link to={'/home'}>Upload</Link></li>
            </ul> */}
            {!show ? (
              <div className="lg:hidden mt-4">
                <img
                  src={menu}
                  alt=""
                  className="w-8"
                  onClick={(e) => setShow(!show)}
                />{" "}
              </div>
            ) : (
              <div className="lg:hidden text-center mt-4">
                <img
                  src={close}
                  alt=""
                  className="w-8"
                  onClick={(e) => setShow(!show)}
                />
              </div>
            )}
          </nav>
        </div>
    </>
  )
}

export default Navbar