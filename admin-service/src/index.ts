import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import './config/connections'

const { PORT } = process.env
const app = express()
import adminAudiences from './frameworks/express/routes/audiencesRoute'
import adminPosts from './frameworks/express/routes/postsRoute'
import admin from './frameworks/express/routes/adminRoutes'
import './interfaces/messageBrokers/kafka/userConsumer'
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded())

app.use('/api/v1/admin', adminAudiences)
app.use('/api/v1/admin',adminPosts)
app.use('/api/v1/admin',admin)
app.listen(PORT, () => console.log('GetChat Admin Service Ready ' + PORT))