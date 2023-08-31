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
        type:String,
        required:true
    },
    chatId:{
        type:ObjectId,
        required:true
    },
    seen: { 
        type: Boolean, default: false 
    }

}, { timestamps: true })




export default mongoose.model<Message>('messages', messageSchema)