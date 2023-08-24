import { sequelize } from "../../config/connection"
import MessageRepository from "../repositories/messageRepository"

const messageRepository = new MessageRepository(sequelize)
export const handleMessage = async (data: any, type: string) => {
    try {
        console.log(data,'data');
        if(type =='deletePost'){
            await messageRepository.deletePost(data.id)
            
        }
        
    } catch (error) {
        console.log(error);
        
        throw error
    }

}