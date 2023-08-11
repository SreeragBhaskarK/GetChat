import { Router } from "express";
import AdminController from "../../../interfaces/controllers/adminController";
import {  auth } from "../../../interfaces/middelwares/auth";
const router = Router()

router.post('/login',AdminController.postLogin)
router.delete('/logout',AdminController.deleteLogout)

export default router