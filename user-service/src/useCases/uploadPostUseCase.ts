import PostRepository from "../interfaces/repositories/postRepository";

class UploadPostUseCase {
    private postRepository
    constructor(postRepository: PostRepository) {
        this.postRepository = PostRepository
    }

    async execute() {
        try {
            return await this.postRepository
        } catch (err) {
            throw err
        }
    }
}

export default UploadPostUseCase