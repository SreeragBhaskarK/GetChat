import { Router } from "express";
import UserController from "../../../interfaces/controllers/userController";

const router = Router()
router.post('/profile',UserController.getUser)
router.patch('/profile',UserController.updateUserData)
router.get('/search-user',UserController.searchUser)
router.patch('/follow',UserController.followUser)
router.patch('/unfollow',UserController.unFollowUser)
router.post('/get-message',UserController.getMessages)

router.get('/find-user-chat/:userId',UserController.getChatUser)
router.post('/chat-create',UserController.createChat)
router.get('/find-chat/:firstId/:secondId')
router.post('/change-seen',UserController.changeSeen)
router.post('/get-follows',UserController.getFollows)

export default router