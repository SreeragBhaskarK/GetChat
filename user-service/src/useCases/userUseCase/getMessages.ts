import UserRepository from "../../interfaces/repositories/userRepository";

class GetMessages{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(chatId:string){
        try {
            return await this.userRepository.getMessages(chatId)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default GetMessages