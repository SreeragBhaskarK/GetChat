import messageModel from "../frameworks/mongoose/models/messageModel"
import mongoose from "mongoose"
const ObjectId =  mongoose.Types.ObjectId
export const webSocket = async (data: any) => {
    try {
        console.log(data,'//////data/');
        const sender = data.senderId
        const recipient = data.recipientId
        const message = new messageModel({
            senderId:new ObjectId(sender),
            recipientId:new ObjectId(recipient),
            content: data.message,
        })

        await message.save()

    } catch (err) {
        throw err
    }
}