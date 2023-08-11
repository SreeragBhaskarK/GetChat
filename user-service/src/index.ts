import express from 'express'
import 'dotenv/config'
import cookieParser from "cookie-parser";
import cors from 'cors'
const { PORT } = process.env
import userAuthRouter from './frameworks/express/routes/userAuthRoutes'
import userRouter from './frameworks/express/routes/userRoutes'
import { connectDB } from './config/connection';
(async () => {
    try {

        await connectDB()
        console.log('GetChat Auth Service DB Ready');
    }
    catch (err: any) {
        console.error('Error connecting to MongoDB:', err.message);
    }
})()
const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use('/api/v1/user', userAuthRouter)
app.use('/api/v1/user', userRouter)
app.listen(PORT, () => console.log('started in auth-service ' + PORT))