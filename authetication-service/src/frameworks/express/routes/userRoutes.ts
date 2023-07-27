import {Router} from 'express'
import UserController from '../../../interfaces/controllers/userController'
import { authMiddleware } from '../../../interfaces/middleware/auth'
const router = Router()

router.post('/login',UserController.postLogin)
router.post('/signup',UserController.postSignup)
router.delete('/logout',authMiddleware,UserController.deleteLogout)
router.post

router.post('/forgot_password',UserController.postForgotPassword)
router.post('/otp-send',UserController.postOtpSend)

/* email */
router.get('/verify',UserController.getVerify)
/* otp */

export default router