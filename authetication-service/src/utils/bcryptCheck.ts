import bcrypt from 'bcrypt'

export const bcryptCheck=(authPassword:string|undefined,password:string)=>{
    if(authPassword)
    return bcrypt.compare(password,authPassword)
    else
    return false
}