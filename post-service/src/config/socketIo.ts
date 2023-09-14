import socketIo from 'socket.io'
import { getPostDashboard } from '../utils/webSocket';

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

            socket.on('postDashboard', async (data) => {
                const result = await getPostDashboard(data.type)
                console.log(data, '////////dashboard');
                
                io.to(data.socketId).emit('postDashboard',{result,type:data.type})
            })

        })
    } catch (error) {
        console.log('////', error, '////');

    }

}