
import advertisingModel from "../../frameworks/mongoose/models/advertisingModel";
import chatModel from "../../frameworks/mongoose/models/chatModel";
import notificationModel from "../../frameworks/mongoose/models/notificationModel";
import userModel from "../../frameworks/mongoose/models/userModel";
import MessageRepository from "../repositories/messageRepository"

const messageRepository = new MessageRepository(userModel,notificationModel,chatModel,advertisingModel)
export const handleMessage = async (data: JSON, type: string) => {
    try {
        if (type === 'insertPost') {
            await messageRepository.insertPost(data)
        }else if(type =='updateUser'){
            await messageRepository.updateUser(data)
        }else if(type =='userDelete'){
            await messageRepository.deleteUser(data)
        }else if(type =='addNotification'){
            await messageRepository.notification(data)
        }else if (type == 'addAdvertising'){
            await messageRepository.advertising(data)
        }
    } catch (error) {
        console.log(error);
        
        throw error
    }

}