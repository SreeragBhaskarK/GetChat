import mongoose from "mongoose"

const ObjectId =  mongoose.Types.ObjectId
class UserRepository{
    
    constructor(private userModel:any,private messageModel:any){
        this.userModel = userModel
        this.messageModel = messageModel
    }
    async getUser (username:string){
        try {
            const userData = await this.userModel.findOne({username})
            return userData
        } catch (err) {
            throw err
            
        }
    }
    async updateUser (username:string,bio:string,gender:string,profilePic:string){
        try {
            console.log(username,bio,gender);
            if(profilePic) return await this.userModel.findOneAndUpdate({username},{$set:{bio,gender,profile_pic:profilePic}},{new:true})
          return await this.userModel.findOneAndUpdate({username},{$set:{bio,gender}},{new:true})
            
        } catch (err) {
            throw err
            
        }
    }
    async searchUser (key:string){
        try {
            
           return await this.userModel.find({username:{$regex:key,$options:'i'}}).limit(5)
            
        } catch (err) {
            throw err
            
        }
    }

    async followUser(followId:string,userId:string){
        try {
            return true
            
        } catch (err) {
            throw err
            
        }
    }
    async unFollowUser(unfollowId:string,userId:string){
        try {
            return true
            
        } catch (err) {
            throw err
            
        }
    }

    async getMessages(userId:string){
        try {
            const result = await this.messageModel.aggregate([{
                $match:{
                    $or:[{senderId:new ObjectId(userId)},{recipientId:new ObjectId(userId)}]
                }
            },{
                $lookup:{
                    from:'users',
                    localField:'senderId',
                    foreignField:'_id',
                    as:'sender'
                }
            },{
                $lookup:{
                    from:'users',
                    localField:'recipientId',
                    foreignField:'_id',
                    as:'recipient'
                }
            },{
                $sort:{createdAt:-1}
            },{
                $limit:10
            }])

            return result
            
        } catch (err) {
            throw err
            
        }
    }
}

export default UserRepository