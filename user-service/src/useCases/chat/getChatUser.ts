import ChatRepository from "../../interfaces/repositories/chatRepository"

class GetChatUser{
    constructor(private chatRepository:ChatRepository){
        this.chatRepository = chatRepository
    }

    async execute(userId:string){
        try {
            return await this.chatRepository.findUserChat(userId)
        } catch (err) {
            throw err
        }
       

    }
}

export default GetChatUser