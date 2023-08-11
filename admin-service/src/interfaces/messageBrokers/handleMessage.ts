import { sequelize } from "../../config/connections"
import MessageRepository from "../repositories/messageRepository"

const messageRepository = new MessageRepository(sequelize)
export const handleMessage = async (data: JSON, type: string) => {
    try {
        if (type === 'insertUser') {
            await messageRepository.insertUser(data)
        }
    } catch (error) {
        console.log(error);
        
        throw error
    }

}