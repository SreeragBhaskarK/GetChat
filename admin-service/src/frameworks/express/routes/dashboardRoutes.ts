import { Router } from "express";
import DashboardController from "../../../interfaces/controllers/dashboardController";
const router = Router()

router.get('/users',DashboardController.getUsers)
router.get('/post-reports',DashboardController.getPostReports)
router.get('/popular-users',DashboardController.getPopularUsers)
router.get('/notifications-week',DashboardController.getNotifications)
export default router