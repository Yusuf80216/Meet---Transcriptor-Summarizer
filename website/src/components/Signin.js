import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { auth } from '../firebase';
const Signin = () => {
    const [name ,setName] = useState('');
    const [email ,setEmail ] = useState('');
    const [password ,setPassword ] = useState('');
    const [error ,setError] = useState('');
    const navigate = useNavigate();

    const {signInUser,getUserName,username} = UserAuth();

    const handleSignin=async(e)=>{
        e.preventDefault()
        try {
            await signInUser(email , password);
            const username = await getUserName(name);
            console.log('username is : ', username);
            navigate('/analytics')
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <>
        <div className='my-16 p-4 mx-auto'>
            <div>
                <h1>Signin to your account</h1>
                <p className='py-2'>
                    Don't have an account ? <Link to='/signup' className='underline'>Signup</Link>
                </p>
            </div>
            <form action="">
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Username</label>
                    <input className="border p-3" type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email address</label>
                    <input className="border p-3" type="email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py-2  font-medium'>Password</label>
                    <input className="border p-3" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className='bg-blue-600 w-full p-4 my-2 rounded-lg text-white' onClick={handleSignin}>Signin</button>
            </form>
        </div>
    </>
  )
}

export default Signin