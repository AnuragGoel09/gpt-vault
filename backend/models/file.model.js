import mongoose from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const fileSchema=new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    content:{
        type:Array,
        default:[]
    },
    parentDir:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Folder"
    },
},{
    timestamps:true
})

fileSchema.plugin(mongooseAggregatePaginate);

export const File=mongoose.model("File",fileSchema);