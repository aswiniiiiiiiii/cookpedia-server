require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const cookpediaServer = express()

cookpediaServer.use(cors())
cookpediaServer.use(express.json())
cookpediaServer.use(router)

const PORT = 3000 || process.env.PORT

cookpediaServer.listen(PORT,()=>{
   console.log(`cookpedia server started at Port :${PORT} and waiting for cilent request`);
   
})

//resolving GET request
cookpediaServer.get('/',(req,res)=>{
res.status(200).send(`<h1 style="color:red;">Coookpedia Server started and waiting for cilent request</h1>`)
})