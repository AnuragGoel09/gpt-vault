import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFile, updateFilenameInDB } from '../../utils/file.requests.js'
import { resetFile, updateFileName } from '../../redux/fileSlice.js'
import { Tooltip as ReactTooltip } from 'react-tooltip' 
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';

export default function FileOptions(props) {

  const [renameOption,setRenameOption]=useState(false)
  const [rename,setRename]=useState("")
  const [renameLoader,setRenameLoader]=useState(false);
  const user=useSelector((state)=>state.user.value)
  const file=useSelector((state)=>state.file.value)
  const dispatch=useDispatch()
  const optionsRef=useRef()

  const deletefile=async()=>{
    await deleteFile(props.id,user.accessToken) 
    if(props.file.current && optionsRef.current){
      props.file.current.style.display="none"
      optionsRef.current.style.display="none"
    }
    dispatch(resetFile())
  }
  const renamefile=async()=>{
      setRenameLoader((prev)=>true)
      await updateFilenameInDB(rename,user.accessToken,props.id)
      if(file?._id==props.id)
        dispatch(updateFileName(rename))
      props.setState((prev)=>!prev)
      setRenameLoader(false)
      props.setShowOptions(false)
  }

  return (
    <div ref={optionsRef} className='w-grow bg-violet-700 p-2 flex justify-end gap-2 text-white border-l-4 border-white relative z-1'>
          {
            !renameOption && <img src="./assets/rename-icon.png" 
            className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
            data-tooltip-id='renamefile'
            onClick={()=>setRenameOption(true)}
            />
          }
          <ReactTooltip id='renamefile'>Rename File</ReactTooltip>

        {
          !renameOption && <img src="./assets/delete-folder-icon.png" 
          className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
          onClick={deletefile}
          data-tooltip-id='deletefile'
          />
        }
          <ReactTooltip id='deletefile'>Delete File</ReactTooltip>
        {
          renameOption && <div className='w-full flex'>
              <input onChange={(event)=>setRename(event.target.value)} className='bg-violet-900 border-none outline-none w-full items-center'/>
          </div>
        }        
        {
          renameOption && !renameLoader && <div className='z-10 cursor-pointer p-0.5 rounded-md m-auto hover:bg-violet-900'>
            <DoneIcon onClick={renamefile}/>
          </div>
        }
        {
          renameOption && renameLoader && <div className='z-10 p-0.5 rounded-md m-auto'>
            <CircularProgress color='inherit' size={'20px'}/>
          </div>
        }
    </div>
  )
}
