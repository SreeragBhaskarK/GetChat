import express from 'express'
import {config} from 'dotenv'
config()
import connection from './config/connection'
connection()

const {PORT}= process.env
import postRoute from './frameworks/express/routes/postRoute'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use('/api/v1',postRoute)

app.listen(PORT,()=>console.log('GetChat Post Service Ready...'))
