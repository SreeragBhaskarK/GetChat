import UserRepository from "../../interfaces/repositories/userRepository";

class FollowUser{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(followUserName:string,user:string){
        try {
            return this.userRepository.followUser(followUserName,user)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default FollowUser