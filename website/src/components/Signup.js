import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import { GoogleAuthProvider } from 'firebase/auth';

const Signup = () => {
  const [name ,setName] = useState('');
  const [email ,setEmail ] = useState('');
  const [password ,setPassword ] = useState('');
  const [error ,setError] = useState('');
  const navigate = useNavigate();

  const {createUser,getUserName , signUpPopup , user} = UserAuth();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');
        try {
            await createUser(email , password);
            const username = await getUserName(name);
            console.log('username is : ', username);
            navigate('/analytics')
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
  }
  const handleGoogleSignup=async(e)=>{
        e.preventDefault();
        try {
            await signUpPopup(provider);
            navigate('/analytics')
        } catch (error) {
            console.log('googleSignupError',error.message);
        }
  }
  return (
    <>
        <div className='my-16 p-4 mx-auto'>
            <div>
                <h1>Create a new Account</h1>
                <p className='py-2'>
                    Already have an account ? <Link to='/' className='underline'>Signin</Link>
                </p>
            </div>
            <form action="" onSubmit={handleSubmit}>
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
                <button className='bg-blue-600 w-full p-4 my-2 rounded-lg text-white'>Signup</button>
                <button className='bg-blue-600 w-full p-4 my-2 rounded-lg text-white' onClick={handleGoogleSignup}>Signup with Google</button>
            </form>
        </div>
    </>
  )
}

export default Signup