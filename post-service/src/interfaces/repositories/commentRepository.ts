import { Sequelize } from "sequelize";
import { commentModel } from "../../frameworks/sequelize/models/commentModel";

class CommentRepository {
    private commentModel
    constructor(sequelize: Sequelize) {
        this.commentModel = commentModel(sequelize)
    }

    async addComments(id: string, comment: string, username: string) {
        try {


            /*  const result: any = await this.postModel.update(
                 {
                     comments: sequelize.fn('array_append', sequelize.col('comments'), { username, comment }),
                 },
                 {
                     where: { id },
                     returning: true,
                 }
             ); */
            const result = await this.commentModel.create({
                post_id: id,
                username: username,
                text: comment
            })
            console.log(result);

            return result.dataValues


        } catch (err) {
            console.log(err);

            throw err

        }
    }

    async getComment(postId: string) {
        try {
            const result = await this.commentModel.findAll({ where: { post_id: postId }, order: [['createdAt', 'DESC']] })
            return result

        } catch (err) {
            throw err

        }
    }

}

export default CommentRepository