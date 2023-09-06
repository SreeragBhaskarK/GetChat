import socketIo from 'socket.io'
import { webSocket } from '../utils/webSocketIo';
import { adminProducer } from '../interfaces/messageBrokers/kafka/postProducer';

export const socketIoConnect = (server: any) => {
    console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
    try {
        const io = new socketIo.Server(server, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        })
        io.on('connection', (socket) => {
            console.log('admin Connected🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', socket.id);
       
            socket.on('notificationSend',async(data)=>{
                console.log(data,'notification👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻');
                const notification = await webSocket(data)
                if(notification){
                    await adminProducer(data,'addPostInUser','notification')
                }
                
            })

         
            socket.on('disconnect', () => {
                console.log('user disconnected', socket.id);
            })
        })
    } catch (error) {
        console.log('////', error, '////');

    }

}