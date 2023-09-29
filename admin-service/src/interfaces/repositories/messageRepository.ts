import { Sequelize } from "sequelize";
import userModel from "../../frameworks/sequelize/models/userModel";
import postModel from "../../frameworks/sequelize/models/postModel";
import notificationModel from "../../frameworks/sequelize/models/notificationModel";

class MessageRepository{
    private UserModal
    private PostModel
    private NotificationModel
    constructor (sequelize:Sequelize){
        this.UserModal= userModel(sequelize)
        this.PostModel = postModel(sequelize)
        this.NotificationModel = notificationModel(sequelize)
    }
    async insertUser (userData:any){
        try{

            if (userData) {
                if(userData.verification_status=='verification processing'){
                    await this.UserModal.destroy({where:{username:userData.username}})
                }
                userData.user_id = userData._id;
                await this.UserModal.create(userData);
            }
            return true

        }catch(err){
            return false
        }
    }

    async insertPost (postData:any){
        try {
            return await this.PostModel.create({
                type:postData[1],
                post:postData[0],
                status:'pending'
            })
            
        } catch (err) {
            throw err
        }

    }


}

export default MessageRepository