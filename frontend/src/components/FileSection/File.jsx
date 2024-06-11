import React, {useRef, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { initializeFile } from '../../redux/fileSlice.js'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileOptions from './FileOptions.jsx';
import { getFile } from '../../utils/file.requests.js';

export default function File(props) {
  const data=props.data
  const [showOptions,setShowOptions]=useState(false)
  const user=useSelector((state)=>state.user.value)
  const fileRef=useRef()

  const dispatch = useDispatch()
  const handleClick=async()=>{
    const file= await getFile(data._id,user.accesstoken)
    dispatch(initializeFile(file))
  }
  return (
    <div ref={fileRef}>
      <div 
      className='w-grow bg-violet-700 p-2 flex gap-2 text-white border-l-4 border-white'
      onClick={handleClick}
      >
          <div className='grow overflow-hidden text-ellipsis'>
            {data.fileName}.gpt
          </div>
          <div className='z-10 cursor-pointer p-0.5 rounded-md m-auto hover:bg-violet-900' onClick={(event)=>{
            event.stopPropagation()
            setShowOptions((prev)=>!prev)
            }}>
            <MoreVertIcon/>
          </div>
      </div>
      {showOptions && <FileOptions file={fileRef} id={data._id} setState={props.setState}/>}
    </div>
  )
}
