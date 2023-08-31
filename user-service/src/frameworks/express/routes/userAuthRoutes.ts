import {Router} from 'express'
import UserAuthController from '../../../interfaces/controllers/userAuthController'
import { authMiddleware } from '../../../interfaces/middleware/auth'
import passport from 'passport'
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

/* google auth */
router.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback',passport.authenticate('google', { session: false }),UserAuthController.getGoogleCallBack)

export default router