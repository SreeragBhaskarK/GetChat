import PostRepository from "../../interfaces/repositories/postRepository";

class GetPosts{
    private postRepository
    constructor(postRepository:PostRepository){
        this.postRepository = postRepository
    }

    async execute(page:number,username:any,type:string){
        try{
            return this.postRepository.getPosts(page,username,type)
        }
        catch(err){
            throw err
        }
    }
}

export default GetPosts