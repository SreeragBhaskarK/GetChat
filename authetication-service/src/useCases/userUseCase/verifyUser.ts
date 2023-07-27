import UserRepository from "../../interfaces/repositories/userRepository";

class Verification{
    private userRepository
    constructor (userRepository:UserRepository){
        this.userRepository = userRepository
    }

   async execute(email:string,token:string){
        return await this.userRepository.verifyToken(email,token)
    }
}

export default Verification