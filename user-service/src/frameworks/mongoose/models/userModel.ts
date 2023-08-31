import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { User } from "../../../entities/userEntity";
const userSchema = new mongoose.Schema<User>({
    email: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    full_name: String,
    phone: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String,
        default:'inactive'
    },
    verification_status:{
        type: String,
        default: 'verification processing'
    },
    gender:{
        type:String,
        default:''
    },
    bio:{
        type:String,
        default:''
    },
    posts:{
        type:[],
        default:[]
    },
    profile_pic:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'
    },
    googleId:{
        type:String,
    },
    google_auth:{
        type:Boolean,
        default:false
    },
    following:{
        type:[],
        default:[]
    },
    followers:{
        type:[],
        default:[]
    }

}, { timestamps: true })

userSchema.pre('save', async function (next) {
    const salt = 10
    if (this.password) {
        this.password = await bcrypt.hashSync(this.password, salt)
    }
    next()
})


export default mongoose.model<User>('users', userSchema)