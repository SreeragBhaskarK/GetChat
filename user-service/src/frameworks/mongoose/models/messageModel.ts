import mongoose from "mongoose";
const ObjectId = mongoose.SchemaTypes.ObjectId
import { Message } from "../../../entities/messageEntity";
const messageSchema = new mongoose.Schema<Message>({
    senderId: {
        type:ObjectId,
        required:true
    },
    recipientId: {
        type:ObjectId,
        required:true
    },
    content: {
        type:String
    },
    chatId:{
        type:ObjectId,
        required:true
    },
    seen: { 
        type: Boolean, default: false 
    },
    delete_user_id:{
        type:[],
        default:[]
    },
    audio:{
        type:'string'
    },image:{
        type:'string'
    }

}, { timestamps: true })




export default mongoose.model<Message>('messages', messageSchema)