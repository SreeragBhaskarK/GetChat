import express from 'express'
import 'dotenv/config'
import userRouter from './frameworks/express/routes/userRoutes'
import './config/connection'
const { PORT } = process.env
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/auth', userRouter)
app.listen(PORT, () => console.log('started in auth-service ' + PORT))