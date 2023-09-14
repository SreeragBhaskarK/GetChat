import { Router } from "express";
import AdvertisingController from "../../../interfaces/controllers/advertisingController";
import updatingAdvertising from '../../../interfaces/controllers/advertisingController'


const router = Router()
router.post('/advertising',AdvertisingController.addAdvertising)
router.get('/advertising',AdvertisingController.getAdvertising)
router.patch('/advertising',AdvertisingController.updatingAdvertising)
router.delete('/advertising/:id',AdvertisingController.deleteAdvertising)

export default router