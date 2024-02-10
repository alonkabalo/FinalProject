import express, { Router } from 'express'
import * as userController from '../controllers/user.controller'
import { authMiddleware } from '../middleware/authMiddleware'

const route = express.Router()

route.post("/signUp", userController.signup )
route.patch("/like/:id",authMiddleware, userController.like)
route.post("/signIn",userController.signIn)

route.put("/", authMiddleware, userController.updateUser)
route.get("/me", authMiddleware, userController.personalInfo)



export default route