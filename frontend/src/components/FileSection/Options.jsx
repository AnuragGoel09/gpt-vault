import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { addFolder, deleteFolder, updateFoldernameInDB } from '../../utils/folder.requests.js'
import { addFile } from '../../utils/file.requests.js'
import { Tooltip as ReactTooltip } from 'react-tooltip' 
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';

export default function Options(props) {

  const user=useSelector((state)=>state.user.value)
  const [renameOption,setRenameOption]=useState(false)
  const [rename,setRename]=useState("")
  const [renameLoader,setRenameLoader]=useState(false);
  const optionsRef=useRef()

  const addfolder=async()=>{
    await addFolder(props.id,user.accessToken) 
    props.setState((state)=>!state)
    props.setShowSubContent(true);
    }
    
  const addfile=async()=>{
    await addFile(props.id,user.accessToken)
    props.setState((state)=>!state)
    props.setShowSubContent(true);
  }

  const renamefolder=async()=>{
      setRenameLoader((prev)=>true)
      await updateFoldernameInDB(rename,user.accessToken,props.id)
      setRenameOption((prev)=>false)
      setRenameLoader((prev)=>false)
      props.setFolderName((prev)=>rename)
      
  }

  const deletefolder=async()=>{

    await deleteFolder(props.id,user.accessToken) 
    props.setShowSubContent(()=>false)
    if(props.folder.current && optionsRef.current){
      props.folder.current.style.display="none"
      optionsRef.current.style.display="none"
    }
  }

  

  return (
    <div ref={optionsRef} className='w-grow bg-violet-700 p-2 flex justify-end gap-2 text-white border-l-4 border-white relative z-1'>
        { !renameOption && <img 
        src="./assets/create-folder-icon.png" 
        className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
        onClick={addfolder}
        data-tooltip-id='addfolder'
        />}
        <ReactTooltip id='addfolder'>Add New Folder</ReactTooltip>

        {!renameOption && <img src="./assets/create-file-icon.png" 
        className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
        onClick={addfile}
        data-tooltip-id='addfile'
        />}
        <ReactTooltip id='addfile'>Add New File</ReactTooltip>

        {!renameOption && !props.root && <img src="./assets/rename-icon.png" 
          className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
          onClick={()=>setRenameOption(true)}
          data-tooltip-id='renamefolder'
          />}
        <ReactTooltip id='renamefolder'>Rename Folder</ReactTooltip>

        {!renameOption && !props.root && <img src="./assets/delete-folder-icon.png" 
        className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
        onClick={deletefolder}
        data-tooltip-id='deletefolder'
        /> }
        <ReactTooltip id='deletefolder'>Delete Folder</ReactTooltip>
        {
          renameOption && <div className='w-full flex'>
              <input onChange={(event)=>setRename(event.target.value)} className='bg-violet-900 border-none outline-none w-full items-center'/>
          </div>
        }        
        {
          renameOption && !renameLoader && <div className='z-10 cursor-pointer p-0.5 rounded-md m-auto hover:bg-violet-900'>
            <DoneIcon onClick={renamefolder}/>
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
