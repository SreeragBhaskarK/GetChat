import UserRepository from "../../interfaces/repositories/userRepository";

class UnFollowUser{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(followUserName:string,user:string){
        try {
            return this.userRepository.unFollowUser(followUserName,user)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default UnFollowUser