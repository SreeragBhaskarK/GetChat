import {DataTypes,Model,Sequelize} from 'sequelize'
import { User } from '../../../entities/userEntity'

interface UserModel extends Model<User>, User {}
const userModel = (sequelize:Sequelize) =>{
    const User = sequelize.define<UserModel>('User',{
        user_id:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        email:{
            type:DataTypes.STRING
        },
        phone:{
            type:DataTypes.STRING
        },
        username:{
            type:DataTypes.STRING
        },
        full_name:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.STRING,
            defaultValue: 'inactive',
        },
        verification_status:{
            type:DataTypes.STRING,
            defaultValue: 'verification processing',
        },
        password:{
            type:DataTypes.STRING
        }
    })
    
    sequelize.sync()
    return User
}

export default userModel