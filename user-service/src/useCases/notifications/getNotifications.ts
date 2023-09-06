import NotificationRepository from "../../interfaces/repositories/notificationRepository";

class GetNotifications{
    constructor (private notificationRepository:NotificationRepository){
    this.notificationRepository =notificationRepository
    }

    async execute(username:string){
        try {
            return await this.notificationRepository.getNotifications(username)
        } catch (err) {
            throw err
            
        }
    }
}

export default GetNotifications