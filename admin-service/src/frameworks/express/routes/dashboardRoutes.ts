import { Router } from "express";
import DashboardController from "../../../interfaces/controllers/dashboardController";
import { auth } from "../../../interfaces/middelwares/auth";
const router = Router()

router.get('/users',auth,DashboardController.getUsers)
router.get('/post-reports',auth,DashboardController.getPostReports)
router.get('/popular-users',auth,DashboardController.getPopularUsers)
router.get('/notifications-week',auth,DashboardController.getNotifications)
router.get('/advertising-overview',auth,DashboardController.getAdvertisingOverview)
export default router