import { Admin } from "../../../entities/adminEntity";
import { sequelize } from "../../../config/connections";
import { DataTypes, Sequelize,Model } from "sequelize";

interface AdminModel extends Model<Admin>,Admin{}

const notificationModel = (sequelize:Sequelize)=>{
    const Notification = sequelize.define<AdminModel>('Admin',{
        _id:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        email:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }
    })

    sequelize.sync()
    return Notification
}

export default notificationModel