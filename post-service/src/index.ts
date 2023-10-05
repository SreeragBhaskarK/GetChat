import express from 'express'
import { config } from 'dotenv'
config()
import connection from './config/connection'
import cors from 'cors'
import postRoute from './frameworks/express/routes/postRoute'
import cookieParser from "cookie-parser";
import { consumeUser } from './interfaces/messageBrokers/postConsumer'
import http from 'http'
import { socketIoConnect } from './config/socketIo'

(async () => {
    try {
        const { SERVER_CORS_URL } = process.env
        await connection()
        const { PORT } = process.env
      
        const app = express()
        const server = http.createServer(app)
        if (SERVER_CORS_URL) {
            app.use(cors({
                origin: [SERVER_CORS_URL,'http://localhost:5173'],
                credentials: true,
            }))
        }
        await socketIoConnect(server)
        app.use(cookieParser())
        app.use(express.json())
        app.use(express.urlencoded())
        app.use('/api/v1/post', postRoute)
        await server.listen(PORT, () => console.log('GetChat Post Service Ready...'))
        await consumeUser()
    } catch (err) {
        console.log(err);

    }

})()



