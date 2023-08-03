import express from 'express'
import { config } from 'dotenv'
config()
import './config/connections'
const { PORT } = process.env
const app = express()
import adminAudiences from './frameworks/express/routes/audiencesRoute'
import adminPosts from './frameworks/express/routes/postsRoute'
/* import { consumeUser } from './interfaces/messageBrokers/kafka/userConsumer' */
app.use(express.json())
app.use(express.urlencoded())
/* const handleUserMessage = (message: string): void => {
    const user = JSON.parse(message);
   console.log(user);
   
};
consumeUser(handleUserMessage) */

app.use('/api/v1/admin/', adminAudiences)
app.use('/api/v1/admin/',adminPosts)
app.listen(PORT, () => console.log('GetChat Admin Service Ready ' + PORT))