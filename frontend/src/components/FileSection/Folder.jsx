import React, { useEffect, useRef, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios'
import File from './File.jsx';
import { useSelector } from 'react-redux';
import Options from './Options.jsx';
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HoverTarget=styled.div`
  display: none;
`;
const HoverComponent=styled.div`
  &:hover ${HoverTarget}{
    display: flex;
  }
`;

export default function Folder(props) {
    const data=props.data;
    const [folderName,setFolderName]=useState(data?.folderName)
    const user=useSelector((state)=>state.user.value);
    useEffect(()=>{
      if(data.isRootDir)
        setFolderName(user.fullname)
    },[user,data])
    const [folderContent,setFolderContent]=useState(null);
    const [showSubContent,setShowSubContent]=useState(false);
    const [showOptions,setShowOptions]=useState(false)
    const [state,setState]=useState(false)
    const folderRef=useRef(null)
    useEffect(()=>{
      const getFolderContents=async()=>{
          await axios.post("http://localhost:8000/api/v1/folders/get-folder-contents",{
              id:data._id
          },{
          headers: {
            'Authorization': `Bearer ${user.accessToken}`
          }
        })
        .then(response =>setFolderContent(response.data.data))
        .catch(error => console.error('Axios error:', error));      
      }
      getFolderContents()
  },[state,showSubContent])
    const handleClick=()=>{
      setShowSubContent((prev)=>!prev)
    }

    return (
    <div>
      <HoverComponent 
      className='w-grow bg-violet-700 p-2 flex gap-2 text-white border-l-4 border-white relative z-1'
      ref={folderRef}
      onClick={handleClick}
      >
          {!showSubContent && <KeyboardArrowRightIcon/>}
          {showSubContent && <KeyboardArrowDownIcon/>}
          <div className='grow overflow-hidden text-ellipsis'>
            {folderName}
          </div>
          <div className='z-10 cursor-pointer p-0.5 rounded-md m-auto hover:bg-violet-900' onClick={(event)=>{
            event.stopPropagation()
            setShowOptions((prev)=>!prev)
            }}>
            <MoreVertIcon/>
          </div>
      </HoverComponent>
      {
        showOptions && <Options folder={folderRef} id={data._id} setFolderName={setFolderName} setState={setState} root={props.root} setShowSubContent={setShowSubContent}/>
      }        
      {showSubContent && <div className='w-grow bg-violet-700 pl-3 flex flex-col'>
          
        {
          folderContent && folderContent.folders.map((item,index)=>(
            <Folder key={index} data={item} setState={setState} root={false}/>
          ))
        }
        {
          folderContent && folderContent.files.map((item,index)=>(
            <File key={index} data={item} setState={setState}/>
          ))
        }
      </div> 
      }
    </div>
  )
}
