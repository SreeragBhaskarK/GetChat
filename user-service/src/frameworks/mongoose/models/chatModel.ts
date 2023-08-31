import mongoose from "mongoose";
import { Chat } from "../../../entities/ChatEntity";

const ChatSchema = new mongoose.Schema<Chat>({
    members: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
        }
        ]
    }
}, { timestamps: true })

export default mongoose.model<Chat>('Chats', ChatSchema)