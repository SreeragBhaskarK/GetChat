import PostRepository from "../../interfaces/repositories/postRepository";

class EditPost {
    constructor(private postRepository:PostRepository){
        this.postRepository = postRepository
    }

    async execute(id:string,caption:string){
        try {
            return await this.postRepository.editPost(id,caption)
        } catch (err) {
            throw err
        }
    }
}

export default EditPost