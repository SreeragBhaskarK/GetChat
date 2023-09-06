
import { sequelize } from "../../../config/connections";
import { DataTypes, Sequelize,Model } from "sequelize";
import { Notification } from "../../../entities/notificationEntity";

interface NotificationModal extends Model<Notification>,Notification{}

export const notificationModel = (sequelize:Sequelize)=>{
    const Notification = sequelize.define<NotificationModal>('Notification',{
        id:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        message:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.STRING
        },
        duration:{
            type:DataTypes.STRING
        },
        user_type:{
            type:DataTypes.STRING
        }
    })

    sequelize.sync()
    return Notification
}

export default notificationModel