
import {Request, Response} from 'express'
import { getTracks, search } from '../spotify_api'
export async function searchQuery(req:Request, res:Response) {
    try {
        const query  = req.params.query
        const results = await search(query)
        res.status(200).json({
            message: query,
            status: 200,
            data: JSON.parse(results)
        })
    }catch(e:any) {
        res.status(400).json({
            message:e.message,
            status: 400,
            data: null
        })
    }
}