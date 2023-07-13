import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/whiteamazonlogo.png'
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { BiCart } from 'react-icons/bi'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const items = useSelector((state)=>state.cart)
    return (
    <>
        <div className='flex justify-between bg-black text-white'>
            <div className='leftSide m-4 pl-4'>
                <img src={logo} alt="" className='w-[120px]' />
            </div>
            <div className='rightSide flex items-center mr-5'>
                <ul className='flex gap-5 text-lg items-center'>
                    {/* <ShoppingCartOutlinedIcon/> */}
                    
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to={'/orders'}>Orders</Link></li>
                    
                        <Link to={'/cart'}>
                            <div className='flex items-center'>
                                <BiCart className='text-[50px] relative'/>
                                <span className='absolute top-0 right-[4.1rem] text-orange-300 font-bold'>{items.length}</span>
                                <span>cart</span>
                            </div>
                        </Link>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Navbar