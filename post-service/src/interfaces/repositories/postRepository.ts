import { Sequelize } from "sequelize"
import postModel from "../../frameworks/sequelize/models/postModel"

class PostRepository{
    private postModel
    constructor(sequelize:Sequelize){
        this.postModel=postModel(sequelize)
    }
    async getPosts(){
        try {
            return await this.postModel.findAll()
        } catch (err) {
            throw err
            
        }
    }
}

export default PostRepository