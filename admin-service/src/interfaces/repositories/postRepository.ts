import { Sequelize } from "sequelize"
import postModel from "../../frameworks/sequelize/models/postModel"

class PostRepository{
    private postModel
    constructor(sequelize:Sequelize){
        this.postModel=postModel(sequelize)
    }
   async getPost(){
        try{
            return await this.postModel.findAll()
        }catch(err){
            throw err
        }
    }

    updatePost(){
        try{
            return true
        }catch(err){
            throw err
        }
    }

    deletePost(){
        try{
            return true
        }catch(err){
            throw err
        }
    }

    addPost(){
        try{
            return true
        }
        catch(err){
            throw err
        }
    }
}

export default PostRepository