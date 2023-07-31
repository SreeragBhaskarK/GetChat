import {Router} from 'express'
import UserController from '../../../interfaces/controllers/userController'
import { authMiddleware } from '../../../interfaces/middleware/auth'
const router = Router()

router.post('/login',UserController.postLogin)
router.post('/signup',UserController.postSignup)
router.delete('/logout',authMiddleware,UserController.deleteLogout)
router.post('/forgot-password',UserController.postForgotPassword)

router.post('/signup-verification',UserController.postSignupVerification)
router.post('/otp-verification',UserController.postOtpVerification)

/* email */
router.post('/email-verification',UserController.postEmailVerification)
/* otp */

export default router