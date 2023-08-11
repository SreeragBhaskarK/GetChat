import {Router} from 'express'
import UserAuthController from '../../../interfaces/controllers/userAuthController'
import { authMiddleware } from '../../../interfaces/middleware/auth'
const router = Router()

router.post('/login',UserAuthController.postLogin)
router.post('/signup',UserAuthController.postSignup)
router.delete('/logout',UserAuthController.deleteLogout)
router.post('/forgot-password',UserAuthController.postForgotPassword)

/* router.post('/signup-verification',UserController.postSignupVerification) */

/* email */
router.post('/email-verification',UserAuthController.postEmailVerification)
/* otp */
router.post('/otp-verification',UserAuthController.postOtpVerification)

export default router