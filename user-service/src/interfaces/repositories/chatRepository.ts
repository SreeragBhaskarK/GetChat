import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId
class ChatRepository {
    constructor(private chatModel: any, private messageModel: any) {
        this.chatModel = chatModel
        this.messageModel = messageModel

    }

    async insertChat(firstId: string, secondId: string) {
        try {
            const userData = await this.chatModel.findOne({
                members: { $all: [new ObjectId(firstId), new ObjectId(secondId)] }
            })
            console.log(userData, '//userDa');



            if (userData) {
                console.log(userData,'userdata');
                
                if (userData.delete_user_id.length) {
                    console.log(userData,'userdata',secondId);

                   await this.chatModel.updateOne({ _id: userData._id }, { $pull: { delete_user_id: secondId } })

                }
                throw new Error('already created chat')
            }
            const chat = new this.chatModel({
                members: [new ObjectId(firstId), new ObjectId(secondId)]
            })
            await chat.save()
            return chat
        } catch (err) {
            console.log(err, 'err');

            throw err
        }

    }

    async findChat(firstId: string, secondId: string) {
        try {
            const userData = await this.chatModel.findOne({
                members: { $all: [firstId, secondId] }
            })

        } catch (err) {
            throw err
        }

    }
    async findUserChat(userId: string) {
        try {
            const userData = await this.chatModel.aggregate([
                {
                    $match: {$and:[{ members: new ObjectId(userId)},{delete_user_id:{$ne:userId}}]
                       
                    }
                },
                {
                    $lookup: {
                        from: 'users', // Replace 'users' with the actual name of your users collection
                        localField: 'members',
                        foreignField: '_id',
                        as: 'memberDetails'
                    }
                },{
                    $sort:{'last_message.updatedAt':-1}
                }
            ]);
            console.log(userData);

            return userData

        } catch (err) {
            throw err
        }

    }

    async changeSeen(messageId: string) {
        try {

            return await this.messageModel.findOneAndUpdate({ _id: messageId }, { seen: true }, { new: true })


        } catch (error) {
            throw error
        }
    }
    async deleteMessage(id: string, userId: string) {
        try {
            return await this.messageModel.updateOne({ _id: id }, { $push: { delete_user_id: userId } })

        } catch (err) {
            throw err

        }
    }

    async deleteChat(id: string, userId: string) {
        try {
            await this.messageModel.updateMany({ chatId: id }, { $push: { delete_user_id: userId } })
            return await this.chatModel.updateOne({ _id: id }, { $push: { delete_user_id: userId } })

        } catch (err) {
            throw err

        }
    }
}

export default ChatRepository