import { Request, Response } from "express";
import NotificationRepository from "../repositories/notificationRepository";
import { sequelize } from "../../config/connections";
import SendNotification from "../../useCases/notification/sendNotification";
import GetNotifications from "../../useCases/notification/getNotifications";
const notificationRepository = new NotificationRepository(sequelize)
class NotificationController {

    static async sendNotification(req:Request,res:Response){
        try {
            console.log('dkfjdkf');
            
            const {message,
            type,
            duration,
            userType} = req.body
            if(!message || !type || !duration || !userType)throw new Error('not found data')
            const sendNotification = new SendNotification(notificationRepository)
            const result = await sendNotification.execute(message,type,duration,userType)
            if(result){

                res.status(200).json({success:true,message:'successfully',data:result})
            }else{

                res.status(400).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(400).json({success:false,message:err.message})
            
        }
    }
    static async getNotifications(req:Request,res:Response){
        try {
            console.log('/////////no');
            
            const getNotifications = new GetNotifications(notificationRepository)
            const result = await getNotifications.execute()
            if(result){

                res.status(200).json({success:true,message:'successfully',data:result})
            }else{

                res.status(400).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(400).json({success:false,message:err.message})
            
        }
    }

}

export default NotificationController