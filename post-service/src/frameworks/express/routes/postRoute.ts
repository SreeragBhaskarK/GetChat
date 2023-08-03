import {Router} from 'express'
import PostController from '../../../interfaces/controllers/postController'
import { upload } from '../../../interfaces/middelwares/multer'
const router = Router()

router.get('/posts',PostController.getPosts)
router.post('/posts',upload.single('img'),PostController.postPosts)
export default router