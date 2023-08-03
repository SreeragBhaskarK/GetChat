import { Request, Response } from "express";
import PostRepository from "../repositories/postRepository";
import UploadPostUseCase from "../../useCases/uploadPostUseCase";


const postRepository = new PostRepository
class PostController {
    static post = async (req: Request, res: Response) => {
        try {
           const uploadPostUseCase = new UploadPostUseCase(postRepository)
           const result = await uploadPostUseCase.execute()
        } catch (err) {

        }
    }
}

export default PostController