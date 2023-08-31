import { Sequelize } from "sequelize"
import postModel from "../../frameworks/sequelize/models/postModel"
import { adminProducer } from "../messageBrokers/kafka/postProducer"

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
            console.log(result,'kjdkfjdkjkdjf');
            if(result >0){
                console.log('kjdkfjdkjkdjf');
                
                await adminProducer({ id: id }, 'add-post', 'deletePost').catch(async(err)=>{
                     await this.postModel.update({status:'pending'},{ where: { 'post.id': id } })
                    throw err
                })
                return true
            }else{
                return false
            }
            
        } catch (err) {
            console.log('errrrrr');
            
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