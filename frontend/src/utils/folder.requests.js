import axios from 'axios'

const addFolder=async(parentDir,accesstoken)=>{
    await axios.post("http://localhost:8000/api/v1/folders/createfolder",{
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
    await axios.post("http://localhost:8000/api/v1/folders/delete-folder",{
        id:folderId
    },{
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    })
    .then()
    .catch(error => console.error('Axios error:', error));
}

export {
    addFolder,
    deleteFolder
}