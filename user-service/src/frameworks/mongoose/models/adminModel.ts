import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
},{timestamps:true})

export default mongoose.model('admin',adminSchema)