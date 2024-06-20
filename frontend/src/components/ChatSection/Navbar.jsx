import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { logoutUser } from '../../redux/userSlice.js';

export default function Navbar() {
  
  const navigate=useNavigate()
  const file=useSelector((state)=>state.file.value)
  const dispatch=useDispatch()
  const [showProfileOptions,setShowProfileOptions]=useState(false)

  const logout=()=>{
    localStorage.removeItem('refreshToken');
    Cookies.set('refreshToken', "refreshToken", { secure: true, httpOnly: true, sameSite: 'Strict' });
    dispatch(logoutUser())
    navigate("/")
  }

  return (
    <div className='w-full px-5 pt-20 flex justify-between items-center sticky top-0 bg-zinc-900 text-sm '>
        <div>
            <div className='bg-stone-800 px-5 py-2 rounded font-medium hover:bg-stone-700 cursor-pointer'>Gemini <KeyboardArrowDownIcon/></div>
        </div>
        {/* <div className='text-red-600 text-sm'>
          Note - Website might work very slow due to free hosting
        </div> */}
        <div className='flex items-center justify-center gap-4'>
            {file.fileName && <div>{file.fileName}.gpt</div>}
            <div className=' flex flex-col items-end relative'>
              <AccountCircleIcon fontSize='large' className='cursor-pointer' onClick={()=>setShowProfileOptions((prev)=>!prev)}/>
               {
                showProfileOptions &&  <div className='bg-zinc-700 rounded absolute top-10'>
                    <div className='cursor-pointer hover:bg-zinc-800 px-5 py-2 rounded'
                      onClick={logout}
                    >Logout</div>
                  </div>
                } 
            </div>
        </div>
    </div>
  )
}
