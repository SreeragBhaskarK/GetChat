
import userModel from "../../frameworks/mongoose/models/userModel";
import MessageRepository from "../repositories/messageRepository"

const messageRepository = new MessageRepository(userModel)
export const handleMessage = async (data: JSON, type: string) => {
    try {
        if (type === 'insertPost') {
            await messageRepository.insertPost(data)
        }else if(type =='updateUser'){
            await messageRepository.updateUser(data)
        }else if(type =='userDelete'){
            await messageRepository.deleteUser(data)
        }
    } catch (error) {
        console.log(error);
        
        throw error
    }

}