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
/* router.get('/find-chat/:firstId/:secondId') */
router.post('/change-seen',UserController.changeSeen)
router.post('/get-follows',UserController.getFollows)
router.delete('/delete-message/:id/:userId',UserController.deleteMessage)
router.delete('/delete-chat/:id/:userId',UserController.deleteChat)
router.get('/notifications',UserController.getNotifications)
router.delete('/notifications',UserController.deleteNotifications)
router.get('/advertising',UserController.getAdvertising)
router.get('/suggestion',UserController.getSuggestion)

export default router