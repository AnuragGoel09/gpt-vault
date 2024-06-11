import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

export default function Navbar() {

  const file=useSelector((state)=>state.file.value)

  return (
    <div className='w-full px-20 py-5 flex justify-between items-center sticky top-0 bg-zinc-900 '>
        <div>
            <div className='bg-stone-800 px-5 py-2 rounded font-medium hover:bg-stone-700 cursor-pointer'>Gemini <KeyboardArrowDownIcon/></div>
        </div>
        <div className='flex items-center justify-center gap-4'>
            {file.fileName && <div>{file.fileName}.gpt</div>}
            <AccountCircleIcon fontSize='large' className='cursor-pointer'/>
        </div>
    </div>
  )
}
