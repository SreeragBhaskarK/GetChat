import {Router} from 'express'
import UserController from '../../../interfaces/controllers/userController'
import { authMiddleware } from '../../../interfaces/middleware/auth'
const router = Router()

router.post('/login',UserController.postLogin)
router.post('/signup',UserController.postSignup)
router.delete('/logout',authMiddleware,UserController.deleteLogout)
router.post('/forgot_password',UserController.postForgotPassword)
router.get('/verify',UserController.getVerify)

export default router