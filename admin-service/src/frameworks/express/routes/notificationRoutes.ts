import { Router } from "express";
import NotificationController from "../../../interfaces/controllers/notificationController";
const router = Router()
router.post('/send-notification',NotificationController.sendNotification)
router.get('/notifications',NotificationController.getNotifications)
export default router