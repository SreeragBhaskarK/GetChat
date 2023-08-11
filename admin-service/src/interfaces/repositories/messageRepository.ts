import { Sequelize } from "sequelize";
import userModel from "../../frameworks/sequelize/models/userModel";

class MessageRepository{
    private UserModal
    constructor (sequelize:Sequelize){
        this.UserModal= userModel(sequelize)
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
}

export default MessageRepository