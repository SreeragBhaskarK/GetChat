class NotificationRepository{
  
    constructor(private notificationModel:any){
        this.notificationModel=notificationModel
    }

    async getNotifications(username:string){
        try {
            console.log(username,'usernamekdjfjfj');
            
           return await this.notificationModel.find({recipient_username:username}).sort({createdAt:-1}).limit(20) 
        } catch (err) {
            throw err
            
        }
    }
}

export default NotificationRepository