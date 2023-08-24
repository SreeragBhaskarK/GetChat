import { Request,Response } from "express"
import AudienceRepository from "../repositories/audienceRepository"
import GetAudience from "../../useCases/audience/getAudience"
import AddAudience from "../../useCases/audience/addAudience"
import UpdateAudience from "../../useCases/audience/updateAudience"
import DeleteAudience from "../../useCases/audience/deleteAudience"
import { sequelize } from "../../config/connections"
import BlockAudience from "../../useCases/audience/blockAudience"


const audienceRepository = new AudienceRepository(sequelize)
class AudienceController {
    static getAudience = async (req:Request,res:Response) => {
        try{
            const getAudience = new GetAudience(audienceRepository)
            const usersData = await getAudience.execute()
            console.log('//////',usersData,'djfkdjfkjd');
            
            if(usersData){
                res.status(200).json({success:true,message:"success",data:usersData})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }

    static addAudience = async (req:Request,res:Response) => {
        try{
            const {mobileOrEmail,username,fullName,password}=req.body
            if(!mobileOrEmail||!username||!fullName||!password)throw new Error('user details incomplete')
            const addAudience = new AddAudience(audienceRepository)
            const result = await addAudience.execute(mobileOrEmail,username,fullName,password)
            if(result){
                res.status(200).json({success:true,message:"success"})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }

    static updateAudience = async (req:Request,res:Response) => {
        try{
            const {phoneOrEmail,username,fullName}=req.body
            if(!phoneOrEmail||!username||!fullName)throw new Error("update incomplete filling")
            const updateAudience = new UpdateAudience(audienceRepository)
            const result = await updateAudience.execute(phoneOrEmail,username,fullName)
            if(result){
                res.status(200).json({success:true,message:"success"})
            }else{
                res.status(404).json({success:false,message:'failed'})
            }
        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }

    static deleteAudience = async (req:Request,res:Response) => {
        try{
            const {userId} =req.body
            if(!userId)throw new Error("user id missing")
            const deleteAudience = new DeleteAudience(audienceRepository)
            const result = await deleteAudience.execute(userId)
            if(result){
                res.status(200).json({success:true,message:"deleted successfully."})
            }else{
                res.status(404).json({success:false,message:'deleted failed.'})
            }
        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }

    static async blockAndUnblockAudience(req:Request,res:Response){
        const {userId} = req.params
        const status= req.query.status as string
        console.log(status,userId);
        
        try {
            if(!userId||status!=='block'&& status!='active')throw new Error("Missing userId/status or invalid status value")
            const blockAudience = new BlockAudience(audienceRepository)
            const result:boolean = await blockAudience.execute(userId,status)
            if(result){
                res.status(200).json({success:true,message:`User ${status} successfully.`})
            }else{
                res.status(400).json({success:false,message:`User ${status} failed`})
            }
            
        } catch (err:any) {
            res.status(400).json({success:false,message:err.message})
        }
    }



}

export default AudienceController