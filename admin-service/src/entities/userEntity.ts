export interface User{
    user_id?:string
    phone?:string
    email?:string
    username:string
    full_name:string
    status?:string
    password?:string
    gender?:string
    bio?:string
    posts?:[]
    profile_pic?:string
    googleId?:string
    google_auth?:boolean
    following?:[]
    followers?:[]
    verification_status?:string
}