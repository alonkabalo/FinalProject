import mongoose from 'mongoose'

const PlaylistScheme = new mongoose.Schema({
    name: { type: String, required: true },
    tracks: [{type: String, required: true}]
})

const Playlist = mongoose.model("playlists", PlaylistScheme)

export default Playlist