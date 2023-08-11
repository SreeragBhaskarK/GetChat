import { Router } from "express";
import Audiences from "../../../interfaces/controllers/audienceController";
import { auth } from "../../../interfaces/middelwares/auth";

const router = Router()
/* audience getting data */
router.get('/audience', Audiences.getAudience)

/* audience adding data */
router.post('/audience', Audiences.addAudience)

/* audience deleting data */
router.delete('/audience', Audiences.deleteAudience)

/* audience updating data */
router.patch('/audience', Audiences.updateAudience)

router.patch('/audience/block/:userId',Audiences.blockAndUnblockAudience)

export default router