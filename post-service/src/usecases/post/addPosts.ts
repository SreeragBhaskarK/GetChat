import PostRepository from "../../interfaces/repositories/postRepository";

class AddPosts{
    constructor (private postRepository:PostRepository){
        this.postRepository =postRepository
    }

    execute(url:string,username:string,caption:string){
        try {
            return this.postRepository.addPost(url,username,caption)
            
        } catch (err) {
            throw err
        }
    }
}

export default AddPosts