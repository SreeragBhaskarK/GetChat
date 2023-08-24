import PostRepository from "../../interfaces/repositories/postRepository";

class LikePost{
    constructor(private postRepository:PostRepository){
        this.postRepository=postRepository
    }

    async execute(id:string,username:string){
        return await this.postRepository.likePost(id,username)
    }
}

export default LikePost