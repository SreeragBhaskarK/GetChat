import NotificationRepository from "../../interfaces/repositories/notificationRepository"

class SendNotification {
    constructor (private notificationRepository:NotificationRepository){
        this.notificationRepository = notificationRepository
    }

    async execute (message:string,type:string,duration:string,userType:string){
        try {
            return await this.notificationRepository.sendNotification(message,type,duration,userType)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default SendNotification