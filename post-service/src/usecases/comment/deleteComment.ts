import PostRepository from "../../interfaces/repositories/postRepository";

class DeleteComment {
    constructor(private postRepository:PostRepository){
        this.postRepository =postRepository
    }

    async execute(id:string,comment:string){
        try {
            return await this.postRepository.deleteComment(id,comment)
            
        } catch (err) {
            throw err
            
        }
    }
}
export default DeleteComment