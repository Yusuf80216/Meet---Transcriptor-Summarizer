import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router';
import { HiOutlineHome } from "react-icons/hi";
import { CgLogOut } from "react-icons/cg";
import { RiUploadCloud2Line } from "react-icons/ri";
import { BsTextRight } from "react-icons/bs";
import { SlNotebook } from "react-icons/sl";
import { BsCreditCard } from "react-icons/bs";
import { TbPuzzle } from "react-icons/tb";
import { FiHelpCircle } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { NavLink} from "react-router-dom";
import { motion } from 'framer-motion';
import SubMenu from '../components/SubMenu';
import userLogo from '../assets/user-pfp.jpg'
import { UserAuth } from '../context/AuthContext';
const Sidebar = ({squeeze}) => {

    let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
    const [open, setOpen] = useState(isTabletMid ? false : true);
    const sidebarRef = useRef();
    const { pathname } = useLocation();
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
    useEffect(() => {
      if (isTabletMid) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }, [isTabletMid]);
  
    useEffect(() => {
      isTabletMid && setOpen(false);
    }, [pathname]);
  
    const Nav_animation = isTabletMid
      ? {
          open: {
            x: 0,
            width: "16rem",
            transition: {
              damping: 40,
            },
          },
          closed: {
            x: -250,
            width: 0,
            transition: {
              damping: 40,
              delay: 0.15,
            },
          },
        }
      : {
          open: {
            width: "16rem",
            transition: {
              damping: 40,
            },
          },
          closed: {
            width: "4rem",
            transition: {
              damping: 40,
            },
          },
        };
  
        const subMenusList = [
          {
            name: "NoteBook",
            icon: SlNotebook,
            menus: ["All Summary", "Shared with me", "My Summary"],
            route: [
              {
                id:1,
                location:'/notebook/allsummary',
              },
              {
                id:2,
                location:'/notebook/shared',
              },
              {
                id:3,
                location:'/notebook/mysummary',
              },
            ]
          },
        ];
        const routes = [
          {
            id:1,
            location:'/notebook/allsummary',
          },
          {
            id:2,
            location:'/notebook/shared',
          },
          {
            id:3,
            location:'/notebook/mysummary',
          },
          
        ]

        const handleMouseEnter=()=>{
          setOpen(true)
        }

        const handleMouseLeave=()=>{
          setOpen(false)
        }
    return (
      <>
      
          <div className='' onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
        <div 
          onClick={() => setOpen(false)}
          className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
            open ? "block" : "hidden"
          } `}
        ></div>
        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={{ x: isTabletMid ? -250 : 0 }}
          animate={open ? "open" : "closed"}
          className=" bg-[#ffffff] text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
              overflow-hidden md:relative fixed
           h-screen "
        >
          <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 text-[#272626] mx-3">
            <img
              src="https://img.icons8.com/color/512/firebase.png"
              width={45}
              alt=""
            />
              <span className="text-xl whitespace-pre cursor-default font-bold">MeetMinute.</span>
          </div>
  
          <div className="flex flex-col  h-full  font-extrabold">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
              <li>
                <NavLink to={"/analytics"} className="link ">
                  <HiOutlineHome size={23} className="min-w-max " />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/upload"} className="link">
                  <RiUploadCloud2Line size={23} className="min-w-max" />
                  Upload
                </NavLink>
              </li>
              <li>
                <NavLink to={"/summary"} className="link">
                  <BsTextRight size={23} className="min-w-max" />
                  Summary
                </NavLink>
              </li>
              {(open || isTabletMid) ? (
                <div className="border-slate-300">
                  {subMenusList?.map((menu) => (
                    <div key={menu.name} className="flex flex-col gap-1">
                      {/* <SubMenu data={menu} routes={routes}/> */}
                      <SubMenu data={menu} route={'/mysummary'}/>
                    </div>
                  ))}
                </div>
              ):(
                  <>
                      <NavLink to={"/upload"} className="link">
                         <SlNotebook size={23} className="min-w-max" />
                          NoteBook
                      </NavLink>
                  </>
              )}
              {/* <div className="flex flex-col gap-1">
                  <li>All summary</li>
              </div>             */}
            </ul>
            <ul className="fixed bottom-0 px-3">
                <li>
                <NavLink to={"/extension"} className="link">
                  <TbPuzzle size={23} className="min-w-max" />
                  {
                      open ? 'Extension' : ''
                  }
                  
                </NavLink>
              </li>
              <li>
                <NavLink to={"/pricing"} className="link">
                  <BsCreditCard size={23} className="min-w-max" />
                  {
                      open ? 'Pricing' : ''
                  }
                </NavLink>
              </li>
              <li>
                <NavLink to={"/rules"} className="link">
                  <FiHelpCircle size={23} className="min-w-max" />
                  {
                      open ? 'Rules' : ''
                  }
                </NavLink>
              </li>
              <li onClick={handleLogout}>
                <NavLink to={"/authentication"} className="link">
                  <CgLogOut size={23} className="min-w-max" />
                  {
                      open ? 'Log out' : ''
                  }
                </NavLink>
              </li>
              </ul>
          </div>
          <motion.div
            onClick={() => {
              setOpen(!open);
            }}
            animate={
              open
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    x: -10,
                    y: -200,
                    rotate: 180,
                  }
            }
            transition={{ duration: 0 }}
            className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
          >
            <IoIosArrowBack size={25} className='text-white' />
          </motion.div>
        </motion.div>
  
        {/* HAMBURGUR MENUU HAINNN */}
        {/* bg-[#635BFF] */}
        {/* onClick={() => setOpen(true)} */}
        <div className="md:hidden text-black bg-white">
          <div className='p-3 flex justify-between items-center w-full h-full shadow-lg'>
              <MdMenu size={25} />
              <div className='w-[35px] h-[35px]'>
                <img src={userLogo} alt="" className='w-full h-full rounded-full' />
              </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default Sidebar