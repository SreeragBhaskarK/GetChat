import { Producer } from "kafka-node";
import { userProducer } from "../messageBrokers/userProducer";

class NotificationRepository{
  
    constructor(private notificationModel:any){
        this.notificationModel=notificationModel
    }

    async getNotifications(username:string){
        try {
            console.log(username,'usernamekdjfjfj');
            
           return await this.notificationModel.find({$or:[{recipient_username:username},{user_type:'all'},{user_type:username}]}).sort({createdAt:-1}).limit(20) 
        } catch (err) {
            throw err
            
        }
    }

    async deleteNotifications(id:string,username:string){
        try {
            
           return await this.notificationModel.updateOne({notification_id:id},{$push:{delete_username:username}})
            /*  await userProducer({id,username},'add-admin',"deleteUserNotification") */
        
            
        } catch (err) {
            
        }

    }
}

export default NotificationRepository