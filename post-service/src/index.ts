import express from 'express'
import { config } from 'dotenv'
config()
import connection from './config/connection'
import cors from 'cors'
import postRoute from './frameworks/express/routes/postRoute'
import cookieParser from "cookie-parser";
import { consumeUser } from './interfaces/messageBrokers/postConsumer'

(async () => {
    try {

        await connection()
        const { PORT } = process.env
      
        const app = express()
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true,
        }));
        
        app.use(cookieParser())
        app.use(express.json())
        app.use(express.urlencoded())
        app.use('/api/v1/post', postRoute)
        await app.listen(PORT, () => console.log('GetChat Post Service Ready...'))
        await consumeUser()
    } catch (err) {
        console.log(err);

    }

})()



