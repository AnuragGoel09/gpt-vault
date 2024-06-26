import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ChatSection from '../components/ChatSection/ChatSection.jsx';
import FileManager from '../components/FileSection/FileManager.jsx';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {serverUrl} from '../constants.js'
import { Tooltip as ReactTooltip } from 'react-tooltip' 

export default function Dashboard() {
  

  const [toggle,setToggle]=useState(true)
  const [rootFolder,setRootFolder]=useState(null)
  const user=useSelector((state)=>state.user.value)
  const navigate=useNavigate()
  const handleFileManager=()=>{
      setToggle((prev)=>!prev)
  }
  useEffect(()=>{
    if(!user)
      navigate("/")
    else{
        axios.post(`${serverUrl}/api/v1/folders/get-root-folder`,{},{
          headers: {
            'Authorization': `Bearer ${user.accessToken}`
          }
        })
        .then(response =>setRootFolder(()=>response.data.data))
        .catch(error => console.error('Axios error:', error));
    }
  },[])
  return (
    <div className='bg-zinc-900 h-screen w-screen flex relative'>
      <div 
      className='absolute top-3 left-3 text-white p-2 bg-violet-700 hover:bg-violet-900 rounded-md cursor-pointer z-30'
      onClick={handleFileManager}
      >
        <MenuOpenIcon style={{fontSize:'25px'}}/>
      </div>
      <div className='absolute top-3 right-3 z-30 cursor-pointer'>
        <WarningIcon data-tooltip-id='note' style={{fontSize:'25px',color:'yellow'}} />
        <ReactTooltip id='note'>Note : Website might work very slow due to free deployment</ReactTooltip>
      </div>
      {toggle && <FileManager root={rootFolder}/>}
      {/* <div className={`${toggle?'w-4/5':'w-full'}`}> */}
      <div className={`w-full ${toggle?'lg:w-4/5':'lg:w-full'}`}>
        <ChatSection className='z-10'/>
      </div>
    </div>
  )
}
