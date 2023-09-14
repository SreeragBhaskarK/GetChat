import { Request, Response } from "express"
import { sequelize } from "../../config/connections"
import AdvertisingRepository from "../repositories/advertisingRepository"
import AddAdvertising from "../../useCases/advertising/addAdvertising"
import UpdatingAdvertising from "../../useCases/advertising/updatingAdvertising"
import GetAdvertising from "../../useCases/advertising/getAdvertising"
import DeleteAdvertising from "../../useCases/advertising/deleteAdvertising"

const advertisingRepository = new AdvertisingRepository(sequelize)

class AdvertisingController {
    static async addAdvertising(req: Request, res: Response) {
        try {
            const { adName, publishedDate, placedArea, adUrl } = req.body
            if (!adName || !publishedDate || !placedArea || !adUrl) throw new Error('data missing')
            const addAdvertising = new AddAdvertising(advertisingRepository)
            const result = await addAdvertising.execute(adName, publishedDate, placedArea, adUrl)
            if (result) {

                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {

                res.status(400).json({ success: false, message: 'failed' })
            }
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }

    }
    static async updatingAdvertising(req: Request, res: Response) {
        try {
            const { adName, publishedDate, placedArea, adUrl, id } = req.body
            if (!adName || !publishedDate || !placedArea || !adUrl || !id) throw new Error('data missing')
            const updateAdvertising = new UpdatingAdvertising(advertisingRepository)
            const result = await updateAdvertising.execute(id, adName, publishedDate, placedArea, adUrl)
            if (result) {

                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {

                res.status(400).json({ success: false, message: 'failed' })
            }
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }

    }
    static async getAdvertising(req: Request, res: Response) {
        try {

            const getAdvertising = new GetAdvertising(advertisingRepository)
            const result = await getAdvertising.execute()
            if (result) {

                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {

                res.status(400).json({ success: false, message: 'failed' })
            }
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }

    }
    static async deleteAdvertising(req: Request, res: Response) {
        try {
            const { id } =req.params as { id: string }
            if(!id)throw new Error('missing id')
            const deleteAdvertising = new DeleteAdvertising(advertisingRepository)
            const result = await deleteAdvertising.execute(id)
            if (result) {

                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {

                res.status(400).json({ success: false, message: 'failed' })
            }
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }

    }


}

export default AdvertisingController