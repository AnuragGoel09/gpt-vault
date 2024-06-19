import axios from 'axios'
import {serverUrl} from '../constants.js'

const addFolder=async(parentDir,accesstoken)=>{
    await axios.post(`${serverUrl}/api/v1/folders/createfolder`,{
        folderName:"New Folder",
        parentDir:parentDir
    },{
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    })
    .then()
    .catch(error => console.error('Axios error:', error));
}

const deleteFolder=async(folderId,accesstoken)=>{
    await axios.post(`${serverUrl}/api/v1/folders/delete-folder`,{
        id:folderId
    },{
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    })
    .then()
    .catch(error => console.error('Axios error:', error));
}

const updateFoldernameInDB=async(newName,accesstoken,file_id)=>{
    await axios.post(`${serverUrl}/api/v1/folders/updatefoldername`,{
        id:file_id,
        folderName:newName
    },{
        headers:{
            'Authorization':`Bearer ${accesstoken}`
        }
    })
    .then()
    .catch(error=>console.log('Axios error',error))
}

export {
    addFolder,
    deleteFolder,
    updateFoldernameInDB
}