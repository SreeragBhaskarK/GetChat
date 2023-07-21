import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:String,
    username:String,
    full_name:String,
    mobile:String,
    password:String,

},{timestamps:true})

export default mongoose.model('users',userSchema)