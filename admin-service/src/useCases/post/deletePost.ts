import { adminProducer } from "../../interfaces/messageBrokers/kafka/postProducer";
import { consumeUser } from "../../interfaces/messageBrokers/kafka/userConsumer";
import PostRepository from "../../interfaces/repositories/postRepository";

class DeletePost {
    private postRepository
    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository
    }

    async execute(id: string) {
        try {
            const result = await this.postRepository.deletePost(id)

            await adminProducer({ id: id }, 'add-post', 'deletePost')
            return result
        }
        catch (err) {
            throw err
        }
    }
}

export default DeletePost