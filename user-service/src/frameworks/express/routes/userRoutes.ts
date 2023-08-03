import { Router } from "express";
import UserController from "../../../interfaces/controllers/userController";
const router = Router()

router.get('/profile',UserController.Profile)

export default router