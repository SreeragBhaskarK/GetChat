import UserRepository from "../../interfaces/repositories/userRepository";

class FollowUser{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(followId:string,userId:string){
        try {
            return this.userRepository.followUser(followId,userId)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default FollowUser