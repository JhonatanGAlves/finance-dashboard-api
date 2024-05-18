import 'dotenv/config.js'
import express from 'express'

const app = express()

app.use(express.json())

app.listen(process.env.PORT, async () => console.log('Listening on port 8080'))
