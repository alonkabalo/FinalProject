
import express from 'express'
import searchRoute from './routes/search.route'
import playlistRoute from './routes/playlist.route'
import userRoute from './routes/user.route'
import cors from 'cors'
import Playlist from './models/Playlist'
const app = express()
app.use(express.json())
app.use(cors())

app.get("/", async(req, res) => {
    // const results = await search("Left for")
    res.status(200).json("Hello world")
})

app.use("/search", searchRoute)
app.use("/auth", userRoute)
app.use("/playlists", playlistRoute)


app.listen(5000, async() => {
    console.log("Listening on port 5000")
    await require("./db");
})
///la;jsf;asljfpo12jep2ihje40912hfhiodsjfgoidsjngl
///  {userId, role}