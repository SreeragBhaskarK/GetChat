import { Sequelize } from "sequelize"
import postModel from "../../frameworks/sequelize/models/postModel"

class PostRepository {
    private postModel
    constructor(sequelize: Sequelize) {
        this.postModel = postModel(sequelize)
    }
    async getPost() {
        try {
            return await this.postModel.findAll()
        } catch (err) {
            throw err
        }
    }

    updatePost() {
        try {
            return true
        } catch (err) {
            throw err
        }
    }

    async deletePost(id: string) {
        try {
            const result:any = await this.postModel.update({status:'solved'},{ where: { 'post.id': id } })
            if(result >0){
                return true
            }else{
                return false
            }
            
        } catch (err) {
            throw err
        }
    }

    addPost() {
        try {
            return true
        }
        catch (err) {
            throw err
        }
    }
}

export default PostRepository