import UserAuthRepository from "../interfaces/repositories/userAuthRepository"

export const googleAuth = async(profile:object)=>{
    try {
       return  await UserAuthRepository.googleAuth(profile)
        
    } catch (err) {
        throw err
        
    }
}