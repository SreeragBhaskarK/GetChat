import UserRepository from "../../interfaces/repositories/userRepository";

class RemoveFollowers{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(followersUsername:string,followingUsername:string){
        try {
            return await this.userRepository.removeFollow(followersUsername,followingUsername)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default RemoveFollowers