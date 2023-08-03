import { Router } from "express";
import postController from "../../../interfaces/controllers/postController";
import { auth } from "../../../interfaces/middelwares/auth";
const router = Router()
/* posts getting data */
router.get('/posts',postController.getPost)

/* posts adding data */
router.post('/posts',postController.addPost)

/* posts deleting data */
router.delete('/posts',postController.deletePost)

/* posts updating data */
router.patch('/posts',postController.updatePost)

export default router