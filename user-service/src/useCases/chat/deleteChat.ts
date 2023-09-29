import ChatRepository from "../../interfaces/repositories/chatRepository";

class DeleteChat{
    constructor(private chatRepository:ChatRepository){
        this.chatRepository = chatRepository

    }

    async execute(id:string,userId:string){
        try {
           return await this.chatRepository.deleteChat(id,userId)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default DeleteChat