import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFile } from '../../utils/file.requests.js'
import { resetFile } from '../../redux/fileSlice.js'
import { Tooltip as ReactTooltip } from 'react-tooltip' 
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function FileOptions(props) {

  const [renameOption,setRenameOption]=useState(false)
  const [rename,setRename]=useState("")
  const user=useSelector((state)=>state.user.value)
  const dispatch=useDispatch()
  const optionsRef=useRef()

  const deletefile=async()=>{
    await deleteFile(props.id,user.accesstoken) 
    if(props.file.current && optionsRef.current){
      props.file.current.style.display="none"
      optionsRef.current.style.display="none"
    }
    dispatch(resetFile())
  }

  // const renamefile=async()=>{
  //   setRenameOption(false)
  //   props.setState((prev)=>!prev)
  //   dispatch(renameFile({
  //     newName:rename,
  //     accesstoken:user.accesstoken
  //   }))
  // }

  

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
          renameOption && <div className='z-10 cursor-pointer p-0.5 rounded-md m-auto hover:bg-violet-900'>
            {/* <MoreVertIcon onClick={renamefile}/> */}
          </div>
        }
    </div>
  )
}
