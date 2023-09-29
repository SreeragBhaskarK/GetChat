import ChatRepository from "../../interfaces/repositories/chatRepository";

class DeleteMessage{
    constructor(private chatRepository:ChatRepository){
        this.chatRepository = chatRepository

    }

    async execute(id:string,userId:string){
        try {
           return await this.chatRepository.deleteMessage(id,userId)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default DeleteMessage