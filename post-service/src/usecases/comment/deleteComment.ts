import PostRepository from "../../interfaces/repositories/postRepository";

class DeleteComment {
    constructor(private postRepository:PostRepository){
        this.postRepository =postRepository
    }

    async execute(commentId:string){
        try {
            return await this.postRepository.deleteComment(commentId)
            
        } catch (err) {
            throw err
            
        }
    }
}
export default DeleteComment