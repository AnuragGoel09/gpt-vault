import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { addFolder, deleteFolder } from '../../utils/folder.requests.js'
import { addFile } from '../../utils/file.requests.js'
import { Tooltip as ReactTooltip } from 'react-tooltip' 

export default function Options(props) {

  const user=useSelector((state)=>state.user.value)
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

  const deletefolder=async()=>{
    await deleteFolder(props.id,user.accessToken) 
    if(props.folder.current && optionsRef.current){
      props.folder.current.style.display="none"
      optionsRef.current.style.display="none"
    }
  }

  

  return (
    <div ref={optionsRef} className='w-grow bg-violet-700 p-2 flex justify-end gap-2 text-white border-l-4 border-white relative z-1'>
        <img 
        src="./assets/create-folder-icon.png" 
        className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
        onClick={addfolder}
        data-tooltip-id='addfolder'
        />
        <ReactTooltip id='addfolder'>Add New Folder</ReactTooltip>

        <img src="./assets/create-file-icon.png" 
        className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
        onClick={addfile}
        data-tooltip-id='addfile'
        />
        <ReactTooltip id='addfile'>Add New File</ReactTooltip>

        {!props.root && <img src="./assets/rename-icon.png" 
          className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
          data-tooltip-id='renamefolder'
          />}
        <ReactTooltip id='renamefolder'>Rename Folder</ReactTooltip>

        {!props.root && <img src="./assets/delete-folder-icon.png" 
        className='h-[20px] hover:scale-150 transition-all cursor-pointer' 
        onClick={deletefolder}
        data-tooltip-id='deletefolder'
        /> }
        <ReactTooltip id='deletefolder'>Delete Folder</ReactTooltip>
                
    </div>
  )
}
