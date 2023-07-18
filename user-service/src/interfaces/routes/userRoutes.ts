import {Router} from 'express'
import { getLogin } from '../controllers/userController'
const router = Router()

router.post('/login',getLogin)

export default router