import express from 'express'
import fs from 'fs'
const route = express.Router()


route.get("/:query", (req,res) => {
   const query  = req.params.query
   const results =  fs.readFileSync("results.json", 'utf-8')
   res.status(200).json({
    query,
    ...JSON.parse(results)
   })
})


export default route