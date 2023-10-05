import { Router } from "express";
import UserController from "../../../interfaces/controllers/userController";
import { authMiddleware } from "../../../interfaces/middleware/auth";

const router = Router()
router.post('/profile',authMiddleware,UserController.getUser)
router.patch('/profile',authMiddleware,UserController.updateUserData)
router.get('/search-user',authMiddleware,UserController.searchUser)
router.patch('/follow',authMiddleware,UserController.followUser)
router.patch('/unfollow',authMiddleware,UserController.unFollowUser)
router.patch('/remove-follow',authMiddleware,UserController.removeFollow)
router.post('/get-message',authMiddleware,UserController.getMessages)

router.get('/find-user-chat/:userId',authMiddleware,UserController.getChatUser)
router.post('/chat-create',authMiddleware,UserController.createChat)
/* router.get('/find-chat/:firstId/:secondId') */
router.post('/change-seen',authMiddleware,UserController.changeSeen)
router.post('/get-follows',authMiddleware,UserController.getFollows)
router.delete('/delete-message/:id/:userId',authMiddleware,UserController.deleteMessage)
router.delete('/delete-chat/:id/:userId',authMiddleware,UserController.deleteChat)
router.get('/notifications',authMiddleware,UserController.getNotifications)
router.delete('/notifications',authMiddleware,UserController.deleteNotifications)
router.get('/advertising',authMiddleware,UserController.getAdvertising)
router.get('/suggestion',authMiddleware,UserController.getSuggestion)

export default router