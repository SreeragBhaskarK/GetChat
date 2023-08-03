import PostRepository from "../interfaces/repositories/postRepository";

class GetPosts{
    private postRepository
    constructor(postRepository:PostRepository){
        this.postRepository = postRepository
    }

    async execute(){
        try{
            return this.postRepository.getPosts()
        }
        catch(err){
            throw err
        }
    }
}

export default GetPosts