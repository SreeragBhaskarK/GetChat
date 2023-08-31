import { Request, Response } from "express"
import userModel from "../../frameworks/mongoose/models/userModel"
import GetUser from "../../useCases/userUseCase/getUser"
import UserRepository from "../repositories/userRepository"
import { User } from "../../entities/userEntity"
import UpdateUser from "../../useCases/userUseCase/updateUser"
import SearchUser from "../../useCases/userUseCase/searchUser"
import FollowUser from "../../useCases/userUseCase/followUser"
import UnFollowUser from "../../useCases/userUseCase/unFollowUser"
import messageModel from "../../frameworks/mongoose/models/messageModel"
import GetMessages from "../../useCases/userUseCase/getMessages"
import GetChatUser from "../../useCases/chat/getChatUser"
import ChatRepository from "../repositories/chatRepository"
import chatModel from "../../frameworks/mongoose/models/chatModel"
import CreateUser from "../../useCases/userUseCase/createUser"
import CreateChatUser from "../../useCases/chat/createChatUser"
import ChangeSeen from "../../useCases/chat/changeSeen"
import GetFollowData from "../../useCases/userUseCase/getFollowData"

const userRepository = new UserRepository(userModel,messageModel)
const chatRepository = new ChatRepository(chatModel,messageModel)
class UserController{

    static async getUser(req:Request,res:Response){
        try {
            console.log(req.body,'///////////');
            
            const {username} = req.body
            if(!username)throw new Error("not found user name");
             new Error('not found username')
            const getUser = new GetUser(userRepository)
            const result:any = await getUser.execute(username)
            console.log(result,'//////');
            
            if(result){
                result.password =undefined
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }

    static async updateUserData(req:Request,res:Response){
        try {
            console.log('🔥🔥🔥');
            console.log(req.body,'///////////');
            console.log('🔥🔥🔥');
            
            const {username,bio,gender,profilePic} = req.body
            if(!username||!bio||!gender)throw new Error("not found user name");
             
            const updateUser = new UpdateUser(userRepository);

            const result:any = await updateUser.execute(username,bio,gender,profilePic);

            console.log(result,'//////');
            
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }
    static async searchUser(req:Request,res:Response){
        try {
            
            const {search,username} = req.query as {search:string,username:string}
            if(!search||!username)throw new Error("not found search key");
             
            const searchUser = new SearchUser(userRepository);

            const result:any = await searchUser.execute(search,username);

            console.log(result,'//////');
            
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }
    static async followUser(req:Request,res:Response){
        try {
            console.log(req.body);
            
            const {followUserName,user} = req.body
            if(!followUserName||!user)throw new Error("not found follow id or user id");
             
            const followUser = new FollowUser(userRepository);

            const result:any = await followUser.execute(followUserName,user);

            console.log(result,'//////');
            
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }
    static async unFollowUser(req:Request,res:Response){
        try {
            console.log(req.body);
            
            const {followUserName,user} = req.body        
            if(!followUserName||!user)throw new Error("not found unfollow id or user id");
             
            const unFollowUser = new UnFollowUser(userRepository);

            const result:any = await unFollowUser.execute(followUserName,user);

            console.log(result,'//////');
            
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }
    static async getMessages(req:Request,res:Response){
        try {
            
            const {chatId} = req.body
            if(!chatId)throw new Error("not found user id");
             
            const getMessages = new GetMessages(userRepository);

            const result:any = await getMessages.execute(chatId);

            console.log(result,'//////');
            
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }

    static async getChatUser (req:Request,res:Response){
        try {
            console.log(req.params,'/////');
            
            const {userId}=req.params
            const getChatUser = new GetChatUser(chatRepository)
            const result = await getChatUser.execute(userId)
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }
    static async createChat (req:Request,res:Response){
        try {
            const {firstId,secondId}=req.body
            if(!firstId||!secondId)throw new Error('id is missing')
            const createChatUser = new CreateChatUser(chatRepository)
            const result = await createChatUser.execute(firstId,secondId)
            
            
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }
    static async changeSeen (req:Request,res:Response){
        try {
            const {messageId}=req.body
            if(!messageId)throw new Error('id is missing')
            const changeSeen = new ChangeSeen(chatRepository)
            const result = await changeSeen.execute(messageId)
            
            
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }
    static async getFollows (req:Request,res:Response){
        try {
            const {userId,type}=req.body
            console.log(req.body);
            
            if(!userId||!type)throw new Error('id or type is missing')
            const getFollowData = new GetFollowData(userRepository)
            const result = await getFollowData.execute(userId,type)
            
            
            if(result){
                res.status(200).json({success:true,message:'successfully',data:result})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(404).json({success:false,message:err.message})
            
        }
    }



}
export default UserController