
import {Request,Response, NextFunction} from 'express'

export function adminMiddleware(
    req: Request, 
    res:Response,
    next: NextFunction) {

    try {
         const user = (req as any).user
         if(user.userType !== 'admin') {
            throw new Error()
         }
         next()
    } catch(e) {
        return res.status(401).send("Unauthorized request")
    }
    
}