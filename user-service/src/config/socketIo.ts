import socketIo from 'socket.io'
import { webSocket } from '../utils/WebSocketIo';

export const socketIoConnect = (server: any) => {
    console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
    try {
        const io = new socketIo.Server(server,{
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST'],
                credentials: true,
              },
        })
        

        io.on('connection', (socket) => {
            console.log('user Connected🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', socket.id);
            socket.on('auth',userId=>{
                
                console.log(userId,'////////user');
                
            })
            socket.on('message', async (data) => {
                console.log(data,'message');
                const message =await webSocket(data)
                console.log('////');
                
                io.emit('privateMessage',message)
            })
            socket.on('disconnect', () => {
                console.log('user disconnected', socket.id);
            })
        })
    } catch (error) {
        console.log('////', error, '////');

    }

}