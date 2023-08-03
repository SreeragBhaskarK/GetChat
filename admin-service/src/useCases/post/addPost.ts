import exp from "constants";
import PostRepository from "../../interfaces/repositories/postRepository";

class AddPost {
    private postRepository
    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository
    }

    async execute() {

        try {
           return await this.postRepository.addPost()
        }
        catch (err) {
            throw err
        }
    }

}

export default AddPost