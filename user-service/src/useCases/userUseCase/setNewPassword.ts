import UserAuthRepository from "../../interfaces/repositories/userAuthRepository";

class SetNewPassword {
    constructor(private userAuthRepository:UserAuthRepository){
        this.userAuthRepository = userAuthRepository
        
    }

    async execute(email:string,newPassword:string,confirmPassword:string){
        try {
            return await this.userAuthRepository.setNewPassword(email,newPassword,confirmPassword)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default  SetNewPassword