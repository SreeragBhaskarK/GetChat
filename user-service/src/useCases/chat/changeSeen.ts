import ChatRepository from "../../interfaces/repositories/chatRepository";

class ChangeSeen {
    constructor(private chatRepository: ChatRepository) {
        this.chatRepository=chatRepository
    }

    async execute(messageId:string){
        try {
            return await this.chatRepository.changeSeen(messageId)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default ChangeSeen