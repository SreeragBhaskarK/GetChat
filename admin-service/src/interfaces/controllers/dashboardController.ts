import { Request, Response } from "express"
import DashboardRepository from "../repositories/dashboardRepository"
import { sequelize } from "../../config/connections"
import GetUser from "../../useCases/dashboard/getUsers"
import GetPostReports from "../../useCases/dashboard/getPostReports"
import GetPopularUsers from "../../useCases/dashboard/getPopularUsers"
import GetNotifications from "../../useCases/dashboard/getNotifications"
import GetAdvertisingOverview from "../../useCases/dashboard/getAdvertising"
import sanitize from "mongo-sanitize"
const dashoboardRepository =  new DashboardRepository(sequelize)
class DashboardController {
    
    static async getUsers(req: Request, res: Response) {

        try {
            const { type,target } = await sanitize(req.query)  as { type: string,target:string }
            if (!type||!target) throw new Error('day missing')
            const getUsers = new GetUser(dashoboardRepository)
            const result = await getUsers.execute(type,target)
            console.log(result,'result');
            
            if(result ||result==0){

                res.status(200).json({ success: true, message:'successfully',data:result })
            }else{

                res.status(400).json({ success: false, message: 'failed' })
            }


        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })

        }

    }
    static async getPostReports(req: Request, res: Response) {

        try {
            const { type,target } = await sanitize(req.query)  as { type: string,target:string }
            if (!type||!target) throw new Error('day missing')
            const getPostReports = new GetPostReports(dashoboardRepository)
            const result = await getPostReports.execute(type,target)
            console.log(result,'result');
            
            if(result ||result==0){

                res.status(200).json({ success: true, message:'successfully',data:result })
            }else{

                res.status(400).json({ success: false, message: 'failed' })
            }


        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })

        }

    }
    static async getPopularUsers(req: Request, res: Response) {

        try {
           
            const getPopularUsers = new GetPopularUsers(dashoboardRepository)
            const result = await getPopularUsers.execute()
            console.log(result,'result');
            
            if(result){

                res.status(200).json({ success: true, message:'successfully',data:result })
            }else{

                res.status(400).json({ success: false, message: 'failed' })
            }


        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })

        }

    }

    static async getNotifications(req: Request, res: Response) {

        try {
           
            const getNotifications = new GetNotifications(dashoboardRepository)
            const result = await getNotifications.execute()
            console.log(result,'result');
            
            if(result){

                res.status(200).json({ success: true, message:'successfully',data:result })
            }else{

                res.status(400).json({ success: false, message: 'failed' })
            }


        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })

        }

    }

    static async getAdvertisingOverview(req: Request, res: Response) {

        try {
            const { type,target } = await sanitize(req.query)  as { type: string,target:string }
            console.log(type,target,'dfdf');
            
            if (!type||!target) throw new Error('day missing')
            const getAdvertisingOverview = new GetAdvertisingOverview(dashoboardRepository)
            const result = await getAdvertisingOverview.execute(type,target)
            console.log(result,'result');
            
            if(result ||result==0){

                res.status(200).json({ success: true, message:'successfully',data:result })
            }else{

                res.status(400).json({ success: false, message: 'failed' })
            }


        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })

        }

    }
}

export default DashboardController