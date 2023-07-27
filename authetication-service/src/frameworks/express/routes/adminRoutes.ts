import { Router } from "express";
import AdminController from "../../../interfaces/controllers/adminController";
import {  authMiddlewareAdmin } from "../../../interfaces/middleware/auth";
const router = Router()

router.post('/login',AdminController.postLogin)
router.delete('/logout',authMiddlewareAdmin,AdminController.deleteLogout)
router.get('/audience',authMiddlewareAdmin,AdminController.getAudience)

export default router