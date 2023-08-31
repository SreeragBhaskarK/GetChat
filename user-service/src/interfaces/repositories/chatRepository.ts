import mongoose from "mongoose";
const ObjectId =mongoose.Types.ObjectId
class ChatRepository {
    constructor(private chatModel: any,private messageModel:any) {
        this.chatModel = chatModel
        this.messageModel =messageModel

    }

    async insertChat(firstId: string, secondId: string) {
        try {
            const userData = await this.chatModel.findOne({
                members: { $all: [new ObjectId(firstId),new ObjectId(secondId)] }
            })
            console.log(userData,'//userDa');
            
            if(userData)throw new Error('already created chat')
            const chat = new this.chatModel({
                members: [new ObjectId(firstId),new ObjectId(secondId)]
            })
            await chat.save()
            return chat
        } catch (err) {
            console.log(err,'err');
            
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
                    $match: {
                        members: new ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'users', // Replace 'users' with the actual name of your users collection
                        localField: 'members',
                        foreignField: '_id',
                        as: 'memberDetails'
                    }
                }
            ]);
            console.log(userData);
            
            return userData

        } catch (err) {
            throw err
        }

    }

    async changeSeen(messageId:string){
        try {

            return await this.messageModel.findOneAndUpdate({_id:messageId},{seen:true},{new:true})
        
          
        } catch (error) {
            throw error
        }
    }
}

export default ChatRepository