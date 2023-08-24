import PostRepository from "../interfaces/repositories/postRepository"

class AddComment {
    constructor(private postRepository:PostRepository){
        this.postRepository = postRepository
    }

    async execute(id:string,comment:string,username:string){
        try {
            return this.postRepository.addComments(id,comment,username)
        } catch (err) {
            throw err
        }
    }
}

export default AddComment