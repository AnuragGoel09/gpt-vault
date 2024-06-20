import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import {lines} from '../utils/catchylines.js'
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate=useNavigate()
  return (
    <div className='flex w-screen h-screen'>
        <div className='w-[60%] bg-violet-800 h-full relative'>
            <div className='ml-10 mt-10 text-4xl font-bold flex items-end text-white absolute top-0 left-0' style={{textShadow:'0px 3px 4px black'}}>
                GPT<span className='text-black text-2xl font-extrabold'>Vault</span>
            </div>
            <div className='w-full h-full p-10 flex items-center text-white text-4xl font-bold'>
                <TypeAnimation
                    sequence={lines}
                    speed={50}
                    repeat={Infinity}
                />
            </div>
        </div>
        <div className='w-[40%] bg-black h-full flex items-center justify-center relative'>
            <div className='text-white flex flex-col items-center gap-2 w-full'>
                <div className='text-2xl'>Get Started</div> 
                <div className='flex gap-5 w-full p-5 justify-center flex-col md:flex-row items-center'>
                    <button className='min-w-[30%] bg-blue-500 p-2 rounded hover:bg-blue-700' onClick={()=>navigate("/login")}>Login</button>
                    <button className='min-w-[30%] bg-blue-500 p-2 rounded hover:bg-blue-700' onClick={()=>navigate("/signup")} >Signup</button>
                </div>
            </div>
            <div className='absolute bottom-10 text-white'>
                GPTvault
            </div>
        </div>
    </div>
  )
}
