import express, { Router } from 'express'
import * as adminController from '../controllers/admin.controller'
import { adminMiddleware } from '../middleware/adminMiddleware'
import { authMiddleware } from '../middleware/authMiddleware'

const route = express.Router()

route.get("/allUsers", authMiddleware, adminMiddleware, adminController.listAllUsers)

export default route