import { postProducer } from "../interfaces/messageBrokers/postProducer";
import PostRepository from "../interfaces/repositories/postRepository";

class ReportPost {
    constructor(private postRepository: PostRepository) {
        this.postRepository = postRepository
    }

    async execute(id: string, type: string) {
        try {
            const post = await this.postRepository.getPost(id)
            const messageData = [post, type]
            await postProducer(messageData, "add-admin", 'postReportAdmin')
            return true
        } catch (err) {
            throw err
        }
    }
}

export default ReportPost