import express from 'express'
import { config } from 'dotenv'
config()
const { PORT} = process.env
const app = express()
import userRouter from './frameworks/express/routes/userRoutes'
import postRouter from './frameworks/express/routes/postRoutes'
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/user',postRouter)
app.listen(PORT,()=> console.log("GetChat User Service Ready "+ PORT))