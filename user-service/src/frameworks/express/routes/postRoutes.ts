import { Router } from "express";
import PostController from "../../../interfaces/controllers/postController";
const router = Router()

router.post('/post',PostController.post)

export default router