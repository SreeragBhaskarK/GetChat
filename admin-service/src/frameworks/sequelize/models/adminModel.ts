import { Admin } from "../../../entities/adminEntity";
import { sequelize } from "../../../config/connections";
import { DataTypes, Sequelize,Model } from "sequelize";

interface AdminModel extends Model<Admin>,Admin{}

const adminModel = (sequelize:Sequelize)=>{
    const Admin = sequelize.define<AdminModel>('Admin',{
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
    return Admin
}

export default adminModel