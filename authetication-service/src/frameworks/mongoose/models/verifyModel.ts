import mongoose from "mongoose";

const verificationsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        required:true
    }
},{timestamps:true})

verificationsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export default mongoose.model('verifications',verificationsSchema)