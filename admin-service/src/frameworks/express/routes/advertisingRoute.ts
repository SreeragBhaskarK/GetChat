import { Router } from "express";
import AdvertisingController from "../../../interfaces/controllers/advertisingController";
import updatingAdvertising from '../../../interfaces/controllers/advertisingController'
import { auth } from "../../../interfaces/middelwares/auth";


const router = Router()
router.post('/advertising',auth,AdvertisingController.addAdvertising)
router.get('/advertising',auth,AdvertisingController.getAdvertising)
router.patch('/advertising',auth,AdvertisingController.updatingAdvertising)
router.delete('/advertising/:id',auth,AdvertisingController.deleteAdvertising)

export default router