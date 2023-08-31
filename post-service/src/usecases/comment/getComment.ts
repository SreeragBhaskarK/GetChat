
import { commentModel } from "../../frameworks/sequelize/models/commentModel";
import CommentRepository from "../../interfaces/repositories/commentRepository";

class GetComment {
    constructor (private commentRepository:CommentRepository){
        this.commentRepository = commentRepository
    }

    async execute(postId:string){
        return await this.commentRepository.getComment(postId)
    }
}
export default GetComment