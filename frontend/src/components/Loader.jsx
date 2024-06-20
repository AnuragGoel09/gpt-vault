import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <div className='h-screen w-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        <CircularProgress/>
        <div>It might take a while due to free deployment of backend</div>
    </div>
  )
}
