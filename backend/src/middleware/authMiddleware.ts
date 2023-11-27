
import {Request,Response, NextFunction} from 'express'
import { Tokens }  from '../utils'

export function authMiddleware(
    req: Request, 
    res:Response,
    next: NextFunction) {

    if(!req.headers.authorization) {
        // no authorization token
        return res.status(401).send("Missing authorization token")
    }
    try {
         const token = req.headers.authorization.split("Bearer ")[1]
         const user = Tokens.decode(token);
         (req as any).user = user
         next()
    } catch(e) {
        return res.status(401).send("Unauthorized request")
    }
    
}