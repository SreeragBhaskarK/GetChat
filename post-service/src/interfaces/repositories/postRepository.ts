import { Sequelize, Op } from "sequelize"
import postModel from "../../frameworks/sequelize/models/postModel"
import { postProducer } from "../messageBrokers/postProducer"
import { sequelize } from "../../config/connection"
import { deleteObject } from "../../utils/s3"
import { Post } from "../../entities/postEntity"
import { commentModel } from "../../frameworks/sequelize/models/commentModel"

class PostRepository {
    private postModel 
    constructor(sequelize: Sequelize) {
        this.postModel = postModel(sequelize)
    }
    async getPosts(page: number, username: string) {
        try {
            console.log(username, page);


            return await this.postModel.findAll({ where: { username: { [Op.ne]: username } }, offset: (page - 1) * 5, limit: 5 })
        } catch (err) {
            throw err

        }
    }

    async addPost(url: string, username: string, caption: string) {
        try {

            const result: any = await this.postModel.create({
                username: username,
                post_url: url,
                caption: caption
            })

            console.log('/', result.dataValues.id, '///url');
            /*  await postProducer({ id: result?.dataValues.id, username: result?.dataValues.username }, 'addPostInUser', "insertPost").catch(async (err) => {
                 await deleteObject(result.dataValues.post_url)
                 const deleteobj = await this.postModel.destroy({ where: { id: result.dataValues.id } })
                 console.log(deleteobj, '///////delete');
 
                 throw err
 
             }) */
            return result.dataValues

        } catch (err) {
            throw err
        }
    }

    async likePost(id: string, username: string) {
        try {
            const existingPost = await this.postModel.findOne({ where: { id: id, likedBy: { [Op.contains]: [username] } } });
            if (!existingPost) {

                const result: any = await this.postModel.update({ likedBy: sequelize.fn('array_append', sequelize.col('likedBy'), username), likes: sequelize.literal('likes + 1') }, { where: { id: id } as any, returning: true })
                return result[1]
            } else {
                return false
            }
        } catch (err) {
            throw err

        }
    }
    async unLikePost(id: number, username: string) {
        try {
            const existingPost = await this.postModel.findOne({ where: { id: id, likedBy: { [Op.contains]: [username] } } });
            if (existingPost) {

                const result: any = await this.postModel.update(
                    {
                        likedBy: sequelize.fn('array_remove', sequelize.col('likedBy'), username),
                        likes: sequelize.literal('likes - 1')
                    },
                    { where: { id: id }, returning: true }
                );
                return result[1]
            } else {
                return false
            }
        } catch (err) {
            throw err

        }
    }

    async getPost(id: string) {
        try {

            const result = await this.postModel.findOne({ where: { id: id } })
            console.log(result);
            return result

        } catch (err) {
            throw err

        }
    }
    async getPostDetails(username: string, page: number) {
        try {

            const result = await this.postModel.findAll({ where: { username }, offset: (page - 1) * 9, limit: 9, order: [['createdAt', 'DESC']] })
            console.log(result);
            return result

        } catch (err) {
            throw err

        }
    }
  

    async editPost (id:string,caption:string){
        try {

            const result= await this.postModel.update({caption},{where:{id},returning:true})
            return result[1]
        } catch (err) {
            throw err
            
        }
    }

    async deletePost(id:string){
        try {
            const post = await this.postModel.findOne({where:{id}})
            if(!post)throw new Error('invalid post id')
            const result = await this.postModel.destroy({where:{id}})
            console.log(result,'//////');
            
            await deleteObject(post.post_url)
            return true
        } catch (err) {
            throw err
        }
    }

    async deleteComment (id:string,comment:string){
        try {

            /* const result =await this.postModel.update({comments:sequelize.fn('array_remove',sequelize.col('comments'),comment)},{where:{id},returning:true})
            return result[1] */
            return true
        } catch (err) {
            throw err
            
        }
    }
}

export default PostRepository