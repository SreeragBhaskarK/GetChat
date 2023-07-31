import UserRepository from "../../interfaces/repositories/userRepository";

class VerificationEmail{
    private userRepository
    constructor (userRepository:UserRepository){
        this.userRepository = userRepository
    }

   async execute(email:string,token:string,type:string){
        return await this.userRepository.verifyToken(email,token,type)
    }
}

export default VerificationEmail