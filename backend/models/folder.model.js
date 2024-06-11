import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
    folderName:{
        type:String,
        required:true
    },
    parentDir:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Folder"
    },
    isRootDir:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

export const Folder = mongoose.model("Folder",folderSchema)