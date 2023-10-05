import { Router } from "express";
import NotificationController from "../../../interfaces/controllers/notificationController";
import { auth } from "../../../interfaces/middelwares/auth";
const router = Router()
router.post('/send-notification',auth,NotificationController.sendNotification)
router.get('/notifications',auth,NotificationController.getNotifications)
export default router