import UserRepository from "../../interfaces/repositories/userRepository";

class UnFollowUser{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(unFollowId:string,userId:string){
        try {
            return this.userRepository.unFollowUser(unFollowId,userId)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default UnFollowUser