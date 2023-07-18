import { Request, Response } from "express";
import { getLoginService } from "../../domain/services/userServices";

export const getLogin = async(req: Request, res: Response) => {
    try {
        let result = await getLoginService()
    }
    catch (err:Error) {
        res.status(400).json({status:'failed',message:err.message})
    }

}