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