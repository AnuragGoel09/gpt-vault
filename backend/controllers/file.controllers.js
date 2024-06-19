import mongoose from "mongoose";
import { File } from "../models/file.model.js";
import { Folder } from "../models/folder.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createFile=asyncHandler(async(req,res)=>{
    
    const {fileName,parentDir}=req.body
    if(!parentDir || !fileName)
        throw new ApiError(400,"Invalid details")

    const folder=await Folder.findById(parentDir)
    if(!folder)
        throw new ApiError(400,"Parent Dir not exists")

    const file=await File.create({
        fileName,parentDir
    })
    res.status(200).json(new ApiResponse(200,file,"File created successfully"))
})

const updateFile=asyncHandler(async(req,res)=>{
    const {newContent,id}=req.body
    if(!id)
        throw new ApiError(400,"File not exists")
    
    const file= await File.findById(id)
    if(!file)
        throw new ApiError(400,"File not exists")
    
    newContent.forEach(element => {
        file.content.push(element)
    });
    // file.content.push(newContent)
    await file.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"File updated successfully"))

})

const updateFileName=asyncHandler(async(req,res)=>{
    const {fileName,id}=req.body
    if(!id)
        throw new ApiError(400,"File not exists")
    
    const file= await File.findById(id)
    if(!file)
        throw new ApiError(400,"File not exists")
    file.fileName=fileName
    await file.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"FileName updates"))
})

const deleteFileWithId=async(id)=>{
    const result=await File.deleteOne({_id:id})
    if(result.deletedCount===1)
        return true
    return false
}

const deleteFile=asyncHandler(async(req,res)=>{
    console.log(req.user)
    const isDelete=await deleteFileWithId(req.body.id)
    if(!isDelete)
        throw new ApiError(400,"Delete unsuccessfully")
    console.log(isDelete)
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Delete file successfully"))
})

const getFile=asyncHandler(async(req,res)=>{
    const file=await File.findById(req.body.id)
    if(!file)
        throw new ApiError(400,"File not found")
    return res
    .status(200)
    .json(new ApiResponse(200,file,"Fetch file successful"))
})

export {
    createFile,
    updateFile,
    deleteFile,
    deleteFileWithId,
    getFile,
    updateFileName
}