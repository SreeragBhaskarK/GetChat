import express from 'express'
import 'dotenv/config'
import './config/connection'
import cookieParser from "cookie-parser";
const { PORT } = process.env
import userRouter from './frameworks/express/routes/userRoutes'
import adminRouter from './frameworks/express/routes/adminRoutes'
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use('/api/auth', userRouter)
app.use('/api/auth/admin',adminRouter)
app.listen(PORT, () => console.log('started in auth-service ' + PORT))