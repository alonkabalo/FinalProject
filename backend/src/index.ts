
import express from 'express'
import { search } from './spotify_api'
import searchRoute from './routes/search.route'
import userRoute from './routes/user.route'

import User from './models/User'
const app = express()
app.use(express.json())

app.get("/", async(req, res) => {
    // const results = await search("Left for")
    res.status(200).json("Hello world")
})

app.use("/search", searchRoute)
app.use("/auth", userRoute)

app.listen(5000, async() => {
    console.log("Listening on port 5000")
    await require("./db");
})
///la;jsf;asljfpo12jep2ihje40912hfhiodsjfgoidsjngl
///  {userId, role}