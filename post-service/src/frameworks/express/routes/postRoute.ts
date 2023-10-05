import {Router} from 'express'
import PostController from '../../../interfaces/controllers/postController'
import { upload } from '../../../interfaces/middelwares/multer'
import { auth } from '../../../interfaces/middelwares/auth'
const router = Router()

router.post('/post',auth,PostController.getPosts)
router.post('/posts',auth,PostController.postPosts)
router.post('/post-url',auth,PostController.postUrl)
router.post('/like',auth,PostController.postLike)
router.post('/unlike',auth,PostController.postUnLike)
router.post('/report',auth,PostController.postReport)
router.get('/post',auth,PostController.getProfilePost)
router.post('/comment',auth,PostController.addComment)
router.patch('/edit-post',auth,PostController.editPost)
router.delete('/delete-post',auth,PostController.deletePost),
router.delete('/delete-comment/:commentId',auth,PostController.deleteComment)
router.get('/comment',auth,PostController.getComment)
router.delete('/audio',auth,PostController.deleteAudio)
export default router