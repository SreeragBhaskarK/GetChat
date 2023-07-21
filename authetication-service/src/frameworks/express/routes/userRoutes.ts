import {Router} from 'express'
import UserController from '../../../interfaces/controllers/userController'
const router = Router()

router.post('/login',UserController.getlogin)
router.post('/signup',UserController.getSignup)

export default router