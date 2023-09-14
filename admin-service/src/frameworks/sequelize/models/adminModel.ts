import { Admin } from "../../../entities/adminEntity";
import { DataTypes, Sequelize,Model } from "sequelize";

interface AdminModel extends Model<Admin>,Admin{}

const adminModel = (sequelize:Sequelize)=>{
    const Admin = sequelize.define<AdminModel>('Admin',{
        _id:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    sequelize.sync()
    return Admin
}

export default adminModel