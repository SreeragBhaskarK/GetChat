import socketIo from 'socket.io'
import { notification, webSocket } from '../utils/WebSocketIo';

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

        const connectedUsers = new Map();
        io.on('connection', (socket) => {
            console.log('user Connected🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', socket.id);
            const connectedSocket = socket
            socket.on('auth', userId => {
                connectedUsers.set(userId, socket)
                console.log(userId, socket.id, '////////user');

            })
            socket.on('private_message', async (data) => {
                console.log(data, 'message');
                if (data) {

                    const message = await webSocket(data)
                    console.log('////');
                    const connectedSocketIds = Array.from(io.sockets.sockets.keys());
                    console.log('Connected Socket IDs:', connectedSocketIds);

                    const recipientSocket = connectedUsers.get(data.recipientId);

                    if (recipientSocket) {


                        recipientSocket.emit('private_message', message)
                    }
                }

              
                /*   socket.to(socket.id).emit('privateMessage',message) */
            })

            socket.on('following', async (data) => {
                if(data){
                    await notification(data)
                    const recipientSocket = connectedUsers.get(data.recipientId);
                    
                    if (recipientSocket) {
                        recipientSocket.emit('notification', data)
                    }
                    console.log(data, 'following');
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