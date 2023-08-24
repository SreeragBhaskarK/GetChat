import express from 'express'
import 'dotenv/config'
import cookieParser from "cookie-parser";
import cors from 'cors'
const { PORT } = process.env
import userAuthRouter from './frameworks/express/routes/userAuthRoutes'
import userRouter from './frameworks/express/routes/userRoutes'
import { connectDB } from './config/connection';
import { consumeUser } from './interfaces/messageBrokers/userConsumer';
import http from 'http'
import { socketIoConnect } from './config/socketIo';


(async () => {
    try {

        await connectDB()
        console.log('GetChat Auth Service DB Ready');
        const app = express()
        const server = http.createServer(app)
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true,
        }))
        await socketIoConnect(server)
        app.use(express.json())
        app.use(express.urlencoded())
        app.use(cookieParser())
        app.use('/api/v1/user', userAuthRouter)
        app.use('/api/v1/user', userRouter)
        await server.listen(PORT, () => console.log('started in auth-service ' + PORT))
        /*  await consumeUser() */
    }
    catch (err: any) {
        console.error('Error connecting to MongoDB:', err.message);
    }
})()

