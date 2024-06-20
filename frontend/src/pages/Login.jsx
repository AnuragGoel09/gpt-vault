import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/user.requests'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../redux/userSlice'
import Cookies from 'js-cookie'
import Loader from '../components/Loader'

export default function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [error,setError]=useState("")
    const [loader,setLoader]=useState(false)
    const handleSubmit=async(e)=>{
        setLoader((prev)=>true)
        e.preventDefault()
        setError(()=>"")
        const formData=new FormData(e.target);
        const email=formData.get('email')
        const password=formData.get('password')
        try {

            const response=await loginUser({email,password})
            dispatch(initializeUser({
                accessToken:response.data.data.accessToken,
                refreshToken:response.data.data.refreshToken,
                fullname:response.data.data.user.fullname
            }))
            localStorage.setItem('refreshToken',response.data.data.refreshToken)
            Cookies.set('refreshToken', response.data.data.refreshToken, { secure: true, httpOnly: true, sameSite: 'Strict' });
        } catch (error) {
            console.log("ERROR",error)
            if(error.response.status==404)
                setError(()=>"User Not Found")
            else if(error.response.status==401)
                setError(()=>"Invalid Credentials")
            else
                setError(()=>"Internal Server Error")
            setTimeout(()=>{
                setError(()=>"")
            },5000)
            console.log("error- ",error)
        }
        setLoader((prev)=>false)
    }
  return (
    <div className='bg-zinc-900 h-screen w-screen flex relative'>
        {loader && <Loader/>}
        <div className='w-[80%] h-[80%] bg-violet-700 m-auto rounded-md shadow-lg relative flex items-center shadow-black'>
            <div className='ml-10 mt-10 text-4xl font-bold flex items-end text-white absolute top-0 left-0' style={{textShadow:'0px 3px 4px black'}}>
                GPT<span className='text-black text-2xl font-extrabold'>Vault</span>
            </div>
            <div className='w-[400px] h-[80%] bg-violet-950 m-auto rounded-xl shadow-black shadow-lg flex flex-col'>
                <div className='flex items-center justify-center text-2xl text-white p-2 mt-5'>Welcome Back Chief!</div>
                <form onSubmit={handleSubmit} className='w-[85%] h-full m-auto'>
                    <label htmlFor='email'  className='block mb-2 text-sm font-medium text-white'>Email</label>
                    <input required type='email' id='email' name='email' className='mb-5 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-violet-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    <label htmlFor='password'  className='block mb-2 text-sm font-medium text-white'>Password</label>
                    <input required type='password' id='password' name='password' className='mb-5 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-violet-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    <button type='submit' className=' text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>Login</button>   
                </form>
                <div className='flex items-center justify-center text-blue-500'>{error}</div>
                <div className='flex gap-2 m-auto text-white mb-1'>Don't have an account?<div className='text-blue-500 cursor-pointer hover:text-blue-400' onClick={()=>navigate("/signup")}>SignUp</div></div>
            </div>
        </div>
    </div>
  )
}
