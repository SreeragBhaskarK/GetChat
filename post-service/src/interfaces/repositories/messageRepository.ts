import { Sequelize } from "sequelize";
import postModel from "../../frameworks/sequelize/models/postModel";


class MessageRepository{
    private postMode 
    constructor (sequelize:Sequelize){
        this.postMode=postModel(sequelize)
    }
    async deletePost(id:string){
        try {
            console.log(id,'///////id');
            
            return await this.postMode.destroy({where:{id:id}})
        } catch (err) {
            throw err
        }
    }
}

export default MessageRepository