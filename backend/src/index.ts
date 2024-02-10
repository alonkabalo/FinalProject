
import express from 'express'
import searchRoute from './routes/search.route'
import adminRoute from './routes/admin.route'
import playlistRoute from './routes/playlist.route'
import userRoute from './routes/user.route'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

app.use("/search", searchRoute)
app.use("/auth", userRoute)
app.use("/admin", adminRoute)
app.use("/playlists", playlistRoute)


app.listen(5000, async() => {
    console.log("Listening on port 5000")
    await require("./db");
})
