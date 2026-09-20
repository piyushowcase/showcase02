import mongoose from'mongoose'
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    credits:{
        type:Number, default:100,
        min :0
    },
  plan:{
        type:String,
         default:"free",
        enum:["free","pro","enterprise"]
    },
    

},{timestamps:true})
export const User = mongoose.model("user",userSchema)