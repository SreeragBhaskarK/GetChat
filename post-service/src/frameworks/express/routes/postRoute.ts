import {Router} from 'express'
import PostController from '../../../interfaces/controllers/postController'
import { upload } from '../../../interfaces/middelwares/multer'
import { auth } from '../../../interfaces/middelwares/auth'
const router = Router()

router.post('/post',PostController.getPosts)
router.post('/posts',PostController.postPosts)
router.post('/post-url',PostController.postUrl)
router.post('/like',PostController.postLike)
router.post('/unlike',PostController.postUnLike)
router.post('/report',PostController.postReport)
router.get('/post',PostController.getProfilePost)
router.post('/comment',PostController.addComment)
router.patch('/edit-post',PostController.editPost)
router.delete('/delete-post',PostController.deletePost),
router.delete('/delete-comment',PostController.deleteComment)
router.get('/comment',PostController.getComment)
export default router