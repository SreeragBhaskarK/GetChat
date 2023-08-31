import { Router } from "express";
import postController from "../../../interfaces/controllers/postController";
import { auth } from "../../../interfaces/middelwares/auth";
const router = Router()
/* posts getting data */
router.get('/posts',auth,postController.getPost)

/* posts adding data */
router.post('/posts',auth,postController.addPost)

/* posts deleting data */
router.delete('/posts/:id',auth,postController.deletePost)

/* posts updating data */
router.patch('/posts',auth,postController.updatePost)

export default router