import React from 'react'
import Folder from './Folder.jsx';
import Options from './Options.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function FileManager(props) {
  const rootFolder=props.root;
  const user=useSelector((state)=>state.user.value)
  useEffect(()=>{
    if(rootFolder){
      rootFolder.folderName=user.fullname
    }
  },[rootFolder])

  return (
    <div className='w-1/5 bg-violet-950 pt-20'>
      {rootFolder && <Folder data={rootFolder} root={true}/>}
    </div>
  )
}
