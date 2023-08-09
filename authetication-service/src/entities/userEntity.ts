import { Types,Document } from "mongoose"

export interface User extends Document {
    _id:Types.ObjectId
    username:string
    email?:string
    password:string|undefined
    full_name:string
    phone?:string
    status:string
    createdAt:any
    updatedAt:any,
    verification_status:string
}