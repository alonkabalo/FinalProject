import express from 'express'
import * as searchController from '../controllers/search.controller'
const route = express.Router()
route.get("/:query",searchController.searchQuery)

export default route