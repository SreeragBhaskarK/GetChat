import jwt from "jsonwebtoken"
import mongoose from "mongoose"

export const tokenGenerate=(authId:mongoose.Types.ObjectId)=>{
    try {
        const secrete_key:string =  process.env.TOKEN_SECRETE_KEY !
        const maxAge = 7 * 24 * 60 * 60 * 1000
        return jwt.sign({ authId }, secrete_key ,{
            expiresIn: maxAge
            
        })
    }
    catch (err) {
        throw err
    }
}
