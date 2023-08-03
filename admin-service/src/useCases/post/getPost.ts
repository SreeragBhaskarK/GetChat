import PostRepository from "../../interfaces/repositories/postRepository"

class GetPost{
    private postRepository
    constructor(postRepository:PostRepository){
        this.postRepository=postRepository
    }

    async execute(){
        try{
            return this.postRepository.getPost()
        }catch(err){
            throw err
        }
    }
}

export default GetPost