class NotificationRepository{
  
    constructor(private notificationModel:any){
        this.notificationModel=notificationModel
    }

    async getNotifications(username:string){
        try {
            console.log(username,'usernamekdjfjfj');
            
           return await this.notificationModel.find({$or:[{recipient_username:username},{user_type:'all'},{user_type:username}]}).sort({createdAt:-1}).limit(20) 
        } catch (err) {
            throw err
            
        }
    }
}

export default NotificationRepository