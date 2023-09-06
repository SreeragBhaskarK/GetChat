import { Sequelize } from "sequelize";
import notificationModel from "../../frameworks/sequelize/models/notificationModel";
import { adminProducer } from "../messageBrokers/kafka/postProducer";

class NotificationRepository{
    private notificationModel
    constructor(sequelize:Sequelize){
        this.notificationModel=notificationModel(sequelize)
    }

    async sendNotification (message:string,type:string,duration:string,userType:string){
        try {
            const notification = await this.notificationModel.create({
                message:message,
                type:type,
                duration:duration,
                user_type:userType
            })
            await adminProducer(notification.dataValues,'addPostInUser','addNotification').catch(async(err)=>{
                await this.notificationModel.destroy({where:{id:notification.dataValues.id}})
                throw err
            })
            return notification.dataValues
            
        } catch (err) {
            throw err
        }
    }
    async getNotifications (){
        try {
            return await this.notificationModel.findAll({order:[["createdAt","DESC"]]})
            
        } catch (err) {
            throw err
        }
    }
}
export default NotificationRepository