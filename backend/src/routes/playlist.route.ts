import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware'

import * as playlistController from '../controllers/playlist.controller'
const route = express.Router()

route.post("/new-playlist", authMiddleware, playlistController.createNewPlayList)
route.delete("/delete-playlist/:playlistId", authMiddleware, playlistController.deletePlaylist)
route.patch("/add-track-to-playlist/:playlistId/:trackId", authMiddleware, playlistController.addTrackToPlaylist)

route.delete("/delete-track-from-playlist/:playlistId/:trackId", authMiddleware, playlistController.deleteTrackFromPlaylist)


export default route