
import PostRepository from "../../interfaces/repositories/postRepository";

class DeletePost {
    private postRepository
    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository
    }

    async execute(id: string) {
        try {
           return await this.postRepository.deletePost(id)
        }
        catch (err) {
            throw err
        }
    }
}

export default DeletePost