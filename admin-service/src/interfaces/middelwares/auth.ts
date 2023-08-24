import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors, VerifyOptions } from 'jsonwebtoken'
interface AuthenticatedRequest extends Request {
    adminId?: JwtPayload
}
export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        console.log('//////////');
        
        const token = req.cookies.admin
        console.log('//////////',token);
        if (token) {
            const secrete_key: string = process.env.TOKEN_SECRETE_KEY!
            jwt.verify(token, secrete_key, (err: VerifyErrors | null, decodedToken: any) => {
                console.log(decodedToken,'////////');
                
                if (err) {
                    res.status(401).json({ success: false, message: 'Permission denied' })
                } else {
                    if ('admin' === decodedToken.admin) {
                        req.adminId = decodedToken.authId
                        next();
                    } else {
                        res.status(403).json({ success: false, message: 'Access forbidden' });
                    }

                }
            })
        } else {

            res.status(401).json({ success: false, message: 'Permission denied' })
        }
    } catch (err) {
        res.status(401).json({ success: false, message: 'Permission denied' })
    }
}