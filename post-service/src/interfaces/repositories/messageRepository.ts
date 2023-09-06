import { Sequelize } from "sequelize";
import postModel from "../../frameworks/sequelize/models/postModel";
import { deleteObject } from "../../utils/s3";


class MessageRepository {
    private postMode
    constructor(sequelize: Sequelize) {
        this.postMode = postModel(sequelize)
    }
    async deletePost(id: string) {
        try {
            console.log(id, '///////id');
            const post = await this.postMode.findOne({ where: { id } })
            console.log(post);

            if (post) {
                await this.postMode.destroy({ where: { id: id } })
                await deleteObject(post?.post_url)
                return true
            } else {
                return false
            }

        } catch (err) {
            throw err
        }
    }
}

export default MessageRepository