import { Router } from "express";
import Audiences from "../../../interfaces/controllers/audienceController";
import { auth } from "../../../interfaces/middelwares/auth";

const router = Router()
/* audience getting data */
router.get('/audience',auth, Audiences.getAudience)

/* audience adding data */
router.post('/audience',auth, Audiences.addAudience)

/* audience deleting data */
router.delete('/audience/:userId',auth, Audiences.deleteAudience)

/* audience updating data */
router.patch('/audience',auth, Audiences.updateAudience)

router.patch('/audience/block/:userId',auth,Audiences.blockAndUnblockAudience)

export default router