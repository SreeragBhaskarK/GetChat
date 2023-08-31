import {DataTypes,Model,Sequelize} from 'sequelize'
import { User } from '../../../entities/userEntity'

interface UserModel extends Model<User>, User {}
const userModel = (sequelize:Sequelize) =>{
    const User = sequelize.define<UserModel>('User',{
        user_id:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            
        },
        phone:{
            type:DataTypes.STRING
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false

        },
        full_name:{
            type:DataTypes.STRING,
            allowNull:false

        },
        status:{
            type:DataTypes.STRING,
            defaultValue: 'inactive',
            allowNull:false

        },
        verification_status:{
            type:DataTypes.STRING,
            defaultValue: 'verification processing',
            allowNull:false

        },
        password:{
            type:DataTypes.STRING
        },gender:{
            type:DataTypes.STRING,
            defaultValue:''
        },
        bio:{
            type:DataTypes.STRING,
            defaultValue: 'verification processing',
        },
        posts:{
            type:DataTypes.JSON,
            defaultValue:[],
            allowNull:false

        },
        profile_pic:{
            type:DataTypes.STRING,
            defaultValue:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s',
            allowNull:false

        },
        googleId:{
            type:DataTypes.STRING
        },
        google_auth:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        following:{
            type:DataTypes.JSON,
            defaultValue:[],
            allowNull:false

        },
        followers:{
            type:DataTypes.JSON,
            defaultValue:[],
            allowNull:false

        }
    })
    
    sequelize.sync()
    return User
}

export default userModel