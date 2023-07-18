import express from 'express'
import userRoutes from './interfaces/routes/userRoutes'
import {config} from 'dotenv'
config()
const app = express()
app.use(express.json())
app.use('/api', userRoutes)


app.listen(process.env.PORT, () => console.log('server started :'+process.env.PORT))