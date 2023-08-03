import PostRepository from "../../interfaces/repositories/postRepository"

class UpdatePost{
    private postRepository
    constructor(postRepository:PostRepository){
        this.postRepository = postRepository
    }

    async execute(){
        try{
            return this.postRepository.updatePost()
        }catch(err){
            throw err
        }
    }
}

export default UpdatePost