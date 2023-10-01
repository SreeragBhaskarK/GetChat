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
import passport from 'passport'
import { googleAuthMiddleware } from './interfaces/middleware/googleAuth'
(async () => {
    try {
        const { SERVER_CORS_URL } = process.env

        await connectDB()
        console.log('GetChat Auth Service DB Ready');
        const app = express()

        const server = http.createServer(app)
        if (SERVER_CORS_URL) {
            app.use(cors({
                origin: [SERVER_CORS_URL, 'https://accounts.google.com/o/oauth2/v2/auth','http://localhost:5173'],
                credentials: true,
            }))
        }

        app.use(passport.initialize())
        googleAuthMiddleware()
        await socketIoConnect(server)
        app.use(express.json())
        app.use(express.urlencoded())
        app.use(cookieParser())
        app.use('/api/v1/user', userAuthRouter)
        app.use('/api/v1/user', userRouter)
        await server.listen(PORT, () => console.log('started in user-service ' + PORT))
        await consumeUser()
    }
    catch (err: any) {
        console.error('Error connecting to MongoDB:', err.message);
    }
})()


