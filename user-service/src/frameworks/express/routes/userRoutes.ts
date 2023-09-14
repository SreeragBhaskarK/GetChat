import { Router } from "express";
import UserController from "../../../interfaces/controllers/userController";

const router = Router()
router.post('/profile',UserController.getUser)
router.patch('/profile',UserController.updateUserData)
router.get('/search-user',UserController.searchUser)
router.patch('/follow',UserController.followUser)
router.patch('/unfollow',UserController.unFollowUser)
router.patch('/remove-follow',UserController.removeFollow)
router.post('/get-message',UserController.getMessages)

router.get('/find-user-chat/:userId',UserController.getChatUser)
router.post('/chat-create',UserController.createChat)
router.get('/find-chat/:firstId/:secondId')
router.post('/change-seen',UserController.changeSeen)
router.post('/get-follows',UserController.getFollows)
router.delete('/delete-message/:id',UserController.deleteMessage)
router.delete('/delete-chat/:id',UserController.deleteChat)
router.get('/notifications',UserController.getNotifications)
router.get('/advertising',UserController.getAdvertising)

export default router