import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'

import adminAudiences from './frameworks/express/routes/audiencesRoute'
import adminPosts from './frameworks/express/routes/postsRoute'
import adminNotification from './frameworks/express/routes/notificationRoutes'
import adminDashboard from './frameworks/express/routes/dashboardRoutes'
import admin from './frameworks/express/routes/adminRoutes'
import advertising from './frameworks/express/routes/advertisingRoute'
import { consumeUser } from './interfaces/messageBrokers/kafka/userConsumer'
import cookieParser from "cookie-parser";
import helmet from 'helmet'
import { socketIoConnect } from './config/socketIo'
import connect from './config/connections'
import http from 'http'

(async () => {
    try {
        const { SERVER_CORS_URL } = process.env
        await connect()
        const { PORT } = process.env
        const app = express()
        const server = http.createServer(app)
        if (SERVER_CORS_URL) {
            app.use(cors({
                origin: [SERVER_CORS_URL,'http://localhost:5173'],
                credentials: true,
            }))
        }
        app.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'"],
                imgSrc: ["'self'"],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
            },
        }));

        await socketIoConnect(server)
        app.use(express.json())
        app.use(express.urlencoded())
        app.use(cookieParser())
        app.use('/api/v1/admin',adminDashboard)
        app.use('/api/v1/admin', adminAudiences)
        app.use('/api/v1/admin', adminPosts)
        app.use('/api/v1/admin',adminNotification)
        app.use('/api/v1/admin',advertising)
        app.use('/api/v1/admin', admin)
        await server.listen(PORT, () => console.log('GetChat Admin Service Ready ' + PORT))
        await consumeUser()
    } catch (error) {
        console.log(error);

    }

})()
