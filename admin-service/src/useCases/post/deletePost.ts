import PostRepository from "../../interfaces/repositories/postRepository";

class DeletePost{
    private postRepository
    constructor(postRepository:PostRepository){
        this.postRepository = postRepository
    }

    async execute(){
        try{
           return await this.postRepository.deletePost()
        }
        catch(err){
            throw err
        }
    }
}

export default DeletePost