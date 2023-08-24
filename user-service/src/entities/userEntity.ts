import { Types,Document } from "mongoose"

export interface User extends Document {
    _id:Types.ObjectId
    username:string
    email?:string
    password:string|undefined
    full_name:string
    phone?:string
    status:string
    posts:[]
    createdAt:any
    updatedAt:any
    verification_status:string
    gender?:string
    bio?:string
    profile_pic?:string
}