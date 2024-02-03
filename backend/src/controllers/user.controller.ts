
import {Request,Response} from 'express'
import User from '../models/User'
import { Tokens } from '../utils'
import crypto from 'crypto'



export async function signup(req:Request, res:Response) {
        try {
            req.body.password = crypto
            .createHash('sha1')
            .update( req.body.password)
            .digest('hex');
           
            const newUser = await User.create(req.body)
            return res.status(201).json({
                message: "",
                status: 201,
                data: newUser
            })
        } catch(e:any) {
            console.log(e)
            return res.status(400).json({
                status:400,
                message: e.message,
                data: null
            })
        }
}
export async function signIn(req:Request, res:Response) {
    // req.body  = {email, password}
    try {
        const { email, password} = req.body
        const user = await User.findOne({ email })
        if(!user) { // no user with given email
           return res.status(400).json({
                message:"Wrong email or password",
                status: 400,
                data: null
            })
        }
        const encryptedPasword = crypto
        .createHash('sha1')
        .update(password)
        .digest('hex');

        if(user.password !== encryptedPasword) { // entered wrong password
            return res.status(400).json({
                message: "Wrong email or password",
                status: 400,
                data: null
            })
        }
        
        const userType = user.userType
        const _id = user._id

        // sign a jwt for the user with the usertype,id
        const token = Tokens.encode({userType, _id})
        res.status(200).json({
            status:200,
            message:"Signed in successfully",
            data: {
                access_token: token
            }
        })
    } catch(e:any) {
        console.log(e)
        return res.status(400).json({
            status:400,
            message:e.message,
            data: null
        })
    }
}


export async function like(req:Request, res:Response) {
        const userId = (req as any).user._id
        const user = await User.findById(userId)
        if(!user) return res.status(400).json({
            status: 400,
            message: req.params.id  + " could not be liked",
            data: null
        })
    
        const idx = user.favorites.indexOf(req.params.id)
        if(idx !== -1) {
            user.favorites.splice(idx, 1)
        } else {
            user.favorites.push(req.params.id)
        }
    
        await user.save()
        return res.status(200).json({
            status: 200,
            message: req.params.id  + " liked",
            data: user.favorites
        })
}

export async function personalInfo(req:Request, res:Response) {
        try {
            const userId = (req as any).user._id
            const user = await User.findById(userId).populate("playlists")
    
            return res.status(200).json({
                status:200,
                message:"me",
                data: user
            })
        } catch(e:any) {
            console.log(e.message)
            return res.status(500).json({
                status:500,
                message:"Unknown error please contact site admins",
                data: null
            })
        }
}

export async function updateUser(req: Request, res:Response) {
    const userId  = (req as any).user._id
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { returnOriginal: false })
        return res.status(200).json({
            status:200,
            message:"Update successfull",
            data: user
        })
    } catch(e:any) {
        return res.status(500).json({
            status:500,
            message:"Could not update personal info, please try again later",
            data: null
        })
    }
}