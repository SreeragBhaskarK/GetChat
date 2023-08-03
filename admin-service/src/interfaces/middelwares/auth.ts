import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors, VerifyOptions } from 'jsonwebtoken'
interface AuthenticatedRequest extends Request {
    adminId?:JwtPayload
}
export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        
        const token = req.cookies.admin
        if (token) {
            const secrete_key: string = process.env.TOKEN_SECRETE_KEY!
            jwt.verify(token, secrete_key, (err: VerifyErrors | null, decodedToken:any ) => {
                if (err) {
                    res.status(401).json({ success: false, message: 'Permission denied' })
                } else {
                    req.adminId = decodedToken
                    next()
                }
            })
        } else {
           
            res.status(401).json({ success: false, message: 'Permission denied' })
        }
    } catch (err) {
        res.status(401).json({ success: false, message: 'Permission denied' })
    }
}