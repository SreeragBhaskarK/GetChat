import NotificationRepository from "../../interfaces/repositories/notificationRepository";

class DeleteNotification {
    constructor (private notificationRepository:NotificationRepository){
        this.notificationRepository = notificationRepository
    }

    async execute (id:string,username:string){
        try {
            return await this.notificationRepository.deleteNotifications(id,username)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default DeleteNotification