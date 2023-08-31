
import { Types, Document } from "mongoose"

export interface Message extends Document {
    _id: Types.ObjectId
    senderId: Types.ObjectId
    recipientId: Types.ObjectId
    chatId: Types.ObjectId
    content: string
    seen:boolean
}
