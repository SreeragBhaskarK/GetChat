import messageModel from "../frameworks/mongoose/models/messageModel"
import mongoose from "mongoose"
import notificationModel from "../frameworks/mongoose/models/notificationModel";
const ObjectId = mongoose.Types.ObjectId
export const webSocket = async (data: any) => {
    try {
        console.log(data, '//////data/');
        const sender = data.senderId
        const recipient = data.recipientId
        const message = new messageModel({
            senderId: new ObjectId(sender),
            recipientId: new ObjectId(recipient),
            content: data.content,
            chatId: data.chatId
        })

        await message.save()
        return message

    } catch (err) {
        throw err
    }
}

export const notification = async (data: any) => {
    try {
        const notification = new notificationModel({
            message:data.message,
            sender_username:data.sender_username,    
            recipient_username:data.recipient_username
        })
        await notification.save()
    } catch (err) {

    }

}