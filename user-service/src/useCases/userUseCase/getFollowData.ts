import UserRepository from "../../interfaces/repositories/userRepository";

class GetFollowData{
    constructor(private userRepository:UserRepository){
        this.userRepository =userRepository
    }

    async execute(userId:string,type:string){
        try {
            return await this.userRepository.getFollowData(userId,type)
            
        } catch (err) {
            throw err
            
        }
    }

}

export default GetFollowData