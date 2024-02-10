
import { Request, Response } from "express";
import User from '../models/User'
export async function listAllUsers(req: Request, res: Response) {
    try {
        const query  = req.params.query
        const users = await User.find({})
        res.status(200).json({
            message: query,
            status: 200,
            data: users
        })
    } catch(e:any) {
        res.status(400).json({
            message:e.message,
            status: 400,
            data: null
        })
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const id  = req.params.userId
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({
            message: "User deleted succesfuly",
            status: 200,
            data: user
        })
    } catch(e:any) {
        res.status(400).json({
            message:e.message,
            status: 400,
            data: null
        })
    }
}