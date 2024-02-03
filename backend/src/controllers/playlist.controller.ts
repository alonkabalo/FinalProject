import User from '../models/User'
import Playlist from '../models/Playlist'

import {Request, Response} from 'express'

export async function createNewPlayList(req: Request, res: Response) {
        const userId = (req as any).user._id
        try {
        const user = await User.findById(userId).populate('playlists')
        if(!user) return res.status(400).json({
            status: 400,
            message:"could not create new playlist",
            data: null
        })
    
        const name = req.body.name
        const tracks = req.body.tracks ?? []
    
        const alreadyHasPlaylistName = user.playlists.find((p :any) => p.name === name)
    
        if(alreadyHasPlaylistName) {
            return res.status(400).json({
                status: 400,
                message:`Playlist already exists with name ${name}`,
                data: null
            })
        }
    
        const playlist = await Playlist.create({name, tracks: tracks})
        user.playlists.push(playlist._id)
        await user.save()
        
        return res.status(201).json({
            status: 201,
            message:`Created playlist with name ${name}`,
            data: playlist
        })
        }catch(e) {
            return res.status(201).json({
                status: 201,
                message:`Could not create playlist with name ${name}`,
                data:null
        })
        }
}

export async function deletePlaylist(req: Request, res: Response) {
        const userId = (req as any).user._id
        try {
        const user = await User.findById(userId)
        if(!user) return res.status(400).json({
            status: 400,
            message:"could not create new playlist",
            data: null
        })
    
        const playlist = await Playlist.findByIdAndDelete(req.params.playlistId)
        if(!playlist) {
            return res.status(400).json({
                status: 400,
                message:`Playlist doesnt not exists`,
                data: null
            })
        }
        const idx = user.playlists.indexOf(playlist._id)
        user.playlists.splice(idx,1)
        await user.save()
        
        return res.status(201).json({
            status: 201,
            message:`Deleted playlist with name ${playlist.name}`,
            data: playlist
        })
    }catch(e) {
        return res.status(201).json({
            status: 201,
            message:`Could not delete playlist`,
            data:null
    })
    }
}

export async function addTrackToPlaylist(req: Request, res: Response) {
    const trackId = req.params.trackId
    try {
        const playlist = await Playlist.findById(req.params.playlistId)
        if(!playlist) {
            throw new Error()
        }
        playlist?.tracks.push(trackId)
        await playlist.save()
        return res.status(200).json({
            status: 200,
            message: "Track added to playlist",
            data: playlist
        })
    } catch(e) {
        return res.status(404).json({
            status: 404,
            message:`Playlist not found`,
            data: null
        })
    }
}

export async function deleteTrackFromPlaylist(req: Request, res: Response) {
    const trackId = req.params.trackId
    try {
        const playlist = await Playlist.findById(req.params.playlistId)
        if(!playlist) {
            throw new Error()
        }
        const idx = playlist.tracks.indexOf(trackId)
        playlist.tracks.splice(idx,1)
        await playlist.save()
        return res.status(200).json({
            status: 200,
            message: "Track remove from playlist",
            data: playlist
        })
    } catch(e) {
        return res.status(404).json({
            status: 404,
            message:`Playlist not found`,
            data: null
        })
    }
}