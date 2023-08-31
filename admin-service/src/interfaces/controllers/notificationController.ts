import { Request, Response } from "express";

class NotificationController {

    static async sendNotification(req:Request,res:Response){
        try {
            
        } catch (err:any) {
            res.status(400).json({success:false,message:err.message})
            
        }
    }

}