import express from 'express'
import fs from 'fs'
import User from '../models/User'
import crypto from 'crypto'
import { Tokens } from '../utils'
import { authMiddleware } from '../middleware/authMiddleware'
const route = express.Router()

route.post("/signUp", async (req, res) => {

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
            message:e.message,
            data: null
        })
    }
})


route.post("/signIn", async (req, res) => {
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
            data: token
        })
    } catch(e:any) {
        console.log(e)
        return res.status(400).json({
            status:400,
            message:e.message,
            data: null
        })
    }
})


route.get("/me", authMiddleware, async (req, res) => {
    try {
        const userId = (req as any).user._id
        const user = await User.findById(userId)

        return res.status(200).json({
            status:200,
            message:"me",
            data: user
        })
    } catch(e:any) {
        return res.status(500).json({
            status:500,
            message:"Unknown error please contact site admins",
            data: null
        })
    }
})



export default route