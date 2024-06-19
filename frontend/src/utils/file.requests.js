import axios from 'axios'
import {serverUrl} from '../constants.js'

const updateChatInDB=async(newContent,accesstoken,file_id)=>{
    await axios.post(`${serverUrl}/api/v1/files/updatefile`,{
        newContent:newContent,
        id:file_id
    },{
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    })
    .then()
    .catch(error => console.error('Axios error:', error));
}

const updateFilenameInDB=async(newName,accesstoken,file_id)=>{
    await axios.post(`${serverUrl}/api/v1/files/updatefilename`,{
        id:file_id,
        fileName:newName
    },{
        headers:{
            'Authorization':`Bearer ${accesstoken}`
        }
    })
    .then()
    .catch(error=>console.log('Axios error',error))
}

const addFile=async(parentDir,accesstoken)=>{
    await axios.post(`${serverUrl}/api/v1/files/createfile`,{
        fileName:"New_File",
        parentDir:parentDir
    },{
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    })
    .then()
    .catch(error => console.error('Axios error:', error));
}

const getFile=async(fileId,accesstoken)=>{
    let file
    await axios.post(`${serverUrl}/api/v1/files/getfile`,{
        id:fileId
    },{
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    }).then((res)=>{file=res.data.data})
    .catch(error=>console.log('Axios error',error))
    return file
}

const deleteFile=async(fileId,accesstoken)=>{
    await axios.post(`${serverUrl}/api/v1/files/deletefile`,{
        id:fileId
    },{
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    })
    .then()
    .catch(error => console.error('Axios error:', error));
}

export {
    updateChatInDB,
    addFile,
    deleteFile,
    getFile,
    updateFilenameInDB
}