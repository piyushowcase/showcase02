import mongoose from "mongoose";
const messageSchema=new mongoose.Schema(
{
    role:{type:String,
        enum:["ai","user"],
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})
const websiteSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    title:{
        type:String,
        default:"untitled website"
    },
    latestCode:{
        type:String,
        required:true
    },
    conversation:[
        messageSchema
    ],
    deployed:{
        type:Boolean,
        default:false
    },
    deployUrl:{
        type:String,
        default:""
    },
    slug:{
        type:String,
        unique:true,
      sparse:"true",
    }
    
},{timestamps:true})
export const Website=mongoose.model("website",websiteSchema)

