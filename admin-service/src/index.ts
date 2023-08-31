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
import { consumeUser } from './interfaces/messageBrokers/kafka/userConsumer'
import cookieParser from "cookie-parser";
import helmet from 'helmet'
(async () => {
    try {
        await consumeUser()
        app.use(cors({
            origin: ["http://localhost:5173"],
            credentials: true
        }))
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
        app.use(express.json())
        app.use(express.urlencoded())
        app.use(cookieParser())
        app.use('/api/v1/admin', adminAudiences)
        app.use('/api/v1/admin', adminPosts)
        app.use('/api/v1/admin', admin)
        await app.listen(PORT, () => console.log('GetChat Admin Service Ready ' + PORT))
    } catch (error) {
        console.log(error);

    }

})()
