import PostRepository from "../../interfaces/repositories/postRepository";

class UnLikePost{
    constructor(private postRepository:PostRepository){
        this.postRepository=postRepository
    }

    async execute(id:number,username:string){
        return await this.postRepository.unLikePost(id,username)
    }
}

export default UnLikePost