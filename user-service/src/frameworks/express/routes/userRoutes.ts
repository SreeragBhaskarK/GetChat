import { Router } from "express";
import UserController from "../../../interfaces/controllers/userController";

const router = Router()
router.post('/profile',UserController.getUser)
router.patch('/profile',UserController.updateUserData)
router.get('/search-user',UserController.searchUser)
router.post('/follow',UserController.followUser)
router.post('/unfollow',UserController.unFollowUser)
router.post('/get-message',UserController.getMessages)

export default router