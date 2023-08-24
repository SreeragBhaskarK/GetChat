import UserRepository from "../../interfaces/repositories/userRepository";

class GetMessages{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(userId:string){
        try {
            return await this.userRepository.getMessages(userId)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default GetMessages