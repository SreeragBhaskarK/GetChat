import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    full_name: String,
    phone: {
        type: String,
        unique: true
    },
    password: String,

}, { timestamps: true })

userSchema.pre('save', async function (next) {
    const salt = 10
    if (this.password) {
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})


export default mongoose.model('users', userSchema)