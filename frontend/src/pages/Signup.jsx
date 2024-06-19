import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../utils/user.requests.js'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { initializeUser } from '../redux/userSlice.js'

export default function Signup() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [error,setError]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError(()=>"")
        const formData=new FormData(e.target);
        const email=formData.get('email')
        const password=formData.get('password')
        const fullname=formData.get('fullname')
        try {
            const res=await registerUser({email,password,fullname})
            const response=await loginUser({email,password})
            dispatch(initializeUser({
                accessToken:response.data.data.accessToken,
                refreshToken:response.data.data.refreshToken,
                fullname:response.data.data.user.fullname
            }))
            localStorage.setItem('refreshToken',response.data.data.refreshToken)
            Cookies.set('refreshToken', response.data.data.refreshToken, { secure: true, httpOnly: true, sameSite: 'Strict' });

        } catch (error) {
            console.log("error",error)
            if(error.response.status==409)
                setError(()=>"User Already Exists")
            else
                setError(()=>"Internal Server Error")
            setTimeout(()=>{
                setError(()=>"")
            },5000)
            console.log("error- ",error)
        }
    }
  return (
    <div className="bg-zinc-900 h-screen w-screen flex relative">
        <div className='w-[80%] h-[80%] bg-violet-800 m-auto rounded-md shadow-lg relative flex items-center shadow-black'>
            <div className='ml-10 mt-10 text-4xl font-bold flex items-end text-white absolute top-0 left-0' style={{textShadow:'0px 3px 4px black'}}>
                GPT<span className='text-black text-2xl font-extrabold'>Vault</span>
            </div>
            <div className='w-[400px] h-[80%] bg-violet-950 m-auto rounded-xl shadow-black shadow-lg flex flex-col'>
                <div className='flex items-center justify-center text-2xl text-white p-2 mt-5'>Welcome to GPTvault, Chief!</div>
                <form onSubmit={handleSubmit} className='w-[85%] m-auto'>
                    <label htmlFor='name'  className='block mb-2 text-sm font-medium text-white'>Fullname</label>
                    <input required type='text' id='name' name='fullname' className='mb-5 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-violet-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    <label htmlFor='email'  className='block mb-2 text-sm font-medium text-white'>Email</label>
                    <input required type='email' id='email' name='email' className='mb-5 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-violet-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    <label htmlFor='password'  className='block mb-2 text-sm font-medium text-white'>Password</label>
                    <input required type='password' id='password' name='password' className='mb-5 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-violet-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    <button type='submit' className=' text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>Signup</button>   
                </form>
                <div className='flex items-center justify-center text-blue-500'>{error}</div>
                <div className='flex gap-2 m-auto text-white mb-1'>Already have an account?<div className='text-blue-500 cursor-pointer hover:text-blue-400' onClick={()=>navigate("/login")}>Login</div></div>
            </div>
        </div>
    </div>
  )
}
