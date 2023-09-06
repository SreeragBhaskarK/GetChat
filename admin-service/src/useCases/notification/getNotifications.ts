import NotificationRepository from "../../interfaces/repositories/notificationRepository"

class GetNotifications{
    constructor(private notificationRepository:NotificationRepository){
        this.notificationRepository = notificationRepository
    }

    async execute(){
        try {
            return await this.notificationRepository.getNotifications()
        } catch (err) {
            throw err
            
        }
    }
}
export default GetNotifications