

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export namespace Tokens {
    export function encode(payload: any) {
        const token = jwt.sign(payload, process.env.SECRET_KEY as string)
        return token
    }   
    export function decode(token: any) {
        return jwt.decode(token)
    }
    
}
