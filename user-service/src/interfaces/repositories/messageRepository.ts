import mongoose from "mongoose";
import  socketIoConnect from "../../config/socketIo";



const ObjectId = mongoose.Types.ObjectId

class MessageRepository {
    private userModel// Use the correct parameter name here
    private notificationModel
    private chatModel
    private advertisingModel
    constructor(userModel: any, notificationModel: any, chatModel: any, advertisingModel: any) {
        this.userModel = userModel; // Use the correct parameter name here
        this.notificationModel = notificationModel
        this.chatModel = chatModel
        this.advertisingModel = advertisingModel
    }

    async insertPost(data: any) {
        try {
            console.log(data, '///////');
            await this.userModel.updateOne({ username: data.username }, { $push: { posts: data } })
            return true

        } catch (err) {
            throw err
        }
    }

    async updateUser(data: any) {
        try {
            console.log(data, '///data');

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.phoneOrEmail)) {
                console.log('email', data.phoneOrEmail);

                const result = await this.userModel.updateOne({ username: data.username }, { $set: { full_name: data.fullName, email: data.phoneOrEmail } })
                console.log('//////', result, '/result');

                return true
            }

            // Check if the inputValue is a valid phone number (you might need a more sophisticated validation)
            else if (/^\d{10}$/.test(data.phoneOrEmail)) {
                console.log('phone', data.phoneOrEmail);
                return await this.userModel.updateOne({ username: data.username }, { $set: { full_name: data.fullName, phone: data.phoneOrEmail } })
            }

        } catch (error) {
            throw error
        }
    }

    async deleteUser(data: any) {
        try {
            console.log(data);

            await this.userModel.deleteOne({ _id: data.userId })
            await this.chatModel.deleteOne({
                members: { $all: [new ObjectId(data.userId)] }
            })
            return true
        } catch (err) {
            throw err
        }

    }

    async notification(data: any) {
        try {
            console.log(data, 'notificationsssss');

            const notification = new this.notificationModel({
                notification_id: data.id,
                seen_username: data.seen_username,
                user_type: data.user_type,
                message: data.message,
                type: data.type,
                duration: data.duration,
                updatedAt: data.updatedAt,
                createdAt: data.createdAt
            })
            console.log(notification, 'save');

            await notification.save()
          
            console.log(notification, 'saved');
        } catch (err) {
            throw err

        }
    }

    async advertising(data: JSON) {
        try {
            console.log(data, 'advertising');
            const advertisingData = new this.advertisingModel(data)
            console.log(advertisingData,'advertisingdata');
            
            await advertisingData.save()
        } catch (err) {
            console.log(err,'advertisingdata');
            throw err

        }
    }
    async updateUserStatus(data:any){
        try {
            await this.userModel.updateOne({_id:data.userId},{$set:{status:data.status}})
            
        } catch (err) {
            throw err
            
        }

    }


}

export default MessageRepository