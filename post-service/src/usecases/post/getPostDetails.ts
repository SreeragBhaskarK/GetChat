import PostRepository from "../../interfaces/repositories/postRepository";


class GetPostDetails{
    constructor(private postRepository:PostRepository){
        this.postRepository=postRepository
    }

    async execute(username:string,page:number){
        try {
            return await this.postRepository.getPostDetails(username,page)
        } catch (error) {
            throw error
        }
    }
}

export default GetPostDetails