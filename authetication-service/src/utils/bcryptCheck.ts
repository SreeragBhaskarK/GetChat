import bcrypt from 'bcryptjs'

export const bcryptCheck=(authPassword:string|undefined,password:string)=>{
    if(authPassword)
    return bcrypt.compareSync(password,authPassword)
    else
    return false
}