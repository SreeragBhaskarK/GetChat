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

const userRepository = new UserRepository(userModel,messageModel)
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
            
            const {search} = req.query as {search:string}
            if(!search)throw new Error("not found search key");
             
            const searchUser = new SearchUser(userRepository);

            const result:any = await searchUser.execute(search);

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
            
            const {followId,userId} = req.body
            if(!followId||!userId)throw new Error("not found follow id or user id");
             
            const followUser = new FollowUser(userRepository);

            const result:any = await followUser.execute(followId,userId);

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
            
            const {unFollowId,userId} = req.body        
            if(!unFollowId||!userId)throw new Error("not found unfollow id or user id");
             
            const unFollowUser = new UnFollowUser(userRepository);

            const result:any = await unFollowUser.execute(unFollowId,userId);

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
            
            const {userId} = req.body
            if(!userId)throw new Error("not found user id");
             
            const getMessages = new GetMessages(userRepository);

            const result:any = await getMessages.execute(userId);

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



}
export default UserController