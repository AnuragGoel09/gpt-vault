import { Folder } from "../models/folder.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFileWithId } from "./file.controllers.js";
import { File } from "../models/file.model.js";
const createFolder=asyncHandler(async (req,res)=>{
    const {folderName,parentDir,isRootDir}=req.body
    if(!parentDir && !isRootDir)
        throw new ApiError(400,"Neither root dir not subdir")

    const newFolder=await Folder.create({
        folderName,parentDir,isRootDir,owner:req.user._id
    })
    res.status(200).json(new ApiResponse(200,newFolder,"folder create successfully"))
})

const getRootFolder = asyncHandler(async(req,res)=>{
    // check auth,
    // find folder with isRootDir true and same owner id
    const rootDir = await Folder.aggregate([
        {
            $match:{
                owner:req.user._id,
                isRootDir:true
            }
        }
    ])
    if(rootDir.length!==1)
        throw new ApiError(400,"No root directory exists")

    return res
    .status(200)
    .json(new ApiResponse(200,rootDir[0],"Root Directory fetched successfully"))
})

const getFolderContent = asyncHandler(async(req,res)=>{
    const folder_id=req.body.id
    if(!folder_id)
        throw new ApiError(400,"Id not found")
    
    const folder = await Folder.findById(folder_id)
    if(!folder)
        throw new ApiError(401,"Folder not found")

    const files=await File.aggregate([
        {
            $match:{
                parentDir:folder._id
            }
        }
    ])
    // console.log(files)
    const Folders=await Folder.aggregate([
        {
            $match:{
                parentDir:folder._id
            }
        }
    ])
    // console.log(Folders)

    return res
    .status(200)
    .json(new ApiResponse(200,{files:files,folders:Folders},"Folder Content fetched successfully"))

})

const deleteFolderWithId=async(id)=>{
    
    const folder=await Folder.findById(id)
    if(!folder)
        throw new ApiError(404,"Folder not found")
    
    const files=await File.aggregate([
        {
            $match:{
                parentDir:folder._id
            }
        }
    ])
    const folders=await Folder.aggregate([
        {
            $match:{
                parentDir:folder._id
            }
        }
    ])
    files.forEach(async(file)=>{
        await File.deleteOne({_id:file})
    })
    folders.forEach((folder)=>{
        deleteFolderWithId(folder._id)
    })
    await Folder.deleteOne(folder._id)
    
}

const deleteFolder=asyncHandler(async(req,res)=>{
    const id=req.body.id
    deleteFolderWithId(id)
    return res
    .status(200)
    .json(new ApiResponse(200,"delete successful"))
})


const updateFolderName=asyncHandler(async(req,res)=>{
    const {folderName,id}=req.body
    if(!id)
        throw new ApiError(400,"Folder does not exist")
    
    const folder= await Folder.findById(id)
    if(!folder)
        throw new ApiError(400,"Folder does not exist")
    folder.folderName=folderName
    await folder.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(new ApiResponse(200,{},"FileName updates"))
})


export {
    createFolder,
    getRootFolder,
    getFolderContent,
    deleteFolder,
    updateFolderName
}