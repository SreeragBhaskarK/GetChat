import ChatRepository from "../../interfaces/repositories/chatRepository"

class CreateChatUser{
    constructor(private chatRepository:ChatRepository){
        this.chatRepository = chatRepository
    }

    async execute(firstId:string,secondId:string){
        try {
            return await this.chatRepository.insertChat(firstId,secondId)
        } catch (err) {
            throw err
        }
       

    }
}

export default CreateChatUser