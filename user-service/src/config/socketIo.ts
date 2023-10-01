import socketIo from 'socket.io'
import { notification, webSocket } from '../utils/WebSocketIo';

export const socketIoConnect = (server: any) => {
    console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
    try {
        const { WEB_SOCKET_CORS_URL } = process.env
        if (!WEB_SOCKET_CORS_URL) throw new Error('not found cors')

        const io = new socketIo.Server(server, {
            cors: {
                origin: [WEB_SOCKET_CORS_URL, 'http://localhost:5173'],
                methods: ['GET', 'POST'],
                credentials: true,
            },
        })



        const notificationSend = (data: JSON) => {

            console.log('kdjfkdfj');
            return true

        }
        const connectedUsers = new Map();
        const connectedAdmin = new Map()
        const connectedSocket = new Map()

        io.on('connection', (socket) => {
            console.log('user Connected🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', socket.id);


            socket.on('auth', userId => {
                connectedUsers.set(userId, socket)
                connectedSocket.set(socket, userId)

            })
            socket.on('admin', () => {
                connectedAdmin.set(`${socket.id}`, socket.id)
            })

            socket.on('userActiveAdmin', async (socketId) => {

                const connectedSocketIds = Array.from(io.sockets.sockets.keys());
                console.log('Connected Socket IDs:', connectedSocketIds);
                let count = connectedSocketIds.length

                const size = connectedAdmin.size
                console.log(size, 'size');

                count = count - size

                io.to(socketId).emit('userActiveAdmin', { count })
            })
            socket.on('private_message', async (data) => {
                console.log(data, 'message');
                if (data) {
                    const message = await webSocket(data)
                    console.log('////');


                    const recipientSocket = connectedUsers.get(data.recipientId);

                    if (recipientSocket) {


                        recipientSocket.emit('private_message', message)
                    }
                }


                /*   socket.to(socket.id).emit('privateMessage',message) */
            })

            socket.on('following', async (data) => {
                if (data) {
                    await notification(data)
                    const recipientSocket = connectedUsers.get(data.recipientId);

                    if (recipientSocket) {
                        recipientSocket.emit('notification', data)
                    }
                    console.log(data, 'following');
                }

            })

            /*      socket.on('calling', async (data) => {
                     console.log(data, 'calling');
                     const recipientSocket = connectedUsers.get(data.userData.recipient._id)
                     if (recipientSocket) {
                         recipientSocket.emit('incommingCall', data)
                     }
                 })
                 socket.on('callAccepted', async (data) => {
                     console.log(data, 'callingAccepted');
                     const recipientSocket = connectedUsers.get(data.userData.recipient._id)
                     if (recipientSocket) {
                         recipientSocket.emit('callAccepted', data)
                     }
                 })
                 socket.on('callEnd', async (data) => {
                     console.log(data, 'calling');
                     if (data.userData) {
     
                         const recipientSocket = connectedUsers.get(data.userData.recipient._id)
                         if (recipientSocket) {
                             recipientSocket.emit('callEnd', data)
                         }
                     }
                 })
                 socket.on('peerNegoNeeded', async (data) => {
                     console.log(data, 'callingnogoooo');
                     if (data.userData) {
     
                         const recipientSocket = connectedUsers.get(data.userData.recipient._id)
                         if (recipientSocket) {
                             recipientSocket.emit('peerNegoNeeded', data)
                         }
                     }
                 })
                 socket.on('peerNegoDone', async (data) => {
                     console.log(data, 'calling');
                     if (data.userData) {
     
                         const recipientSocket = connectedUsers.get(data.userData.recipient._id)
                         if (recipientSocket) {
                             recipientSocket.emit('peerNegoFinal', data)
                         }
                     }
                 }) */

            socket.on("message_seen", async (data) => {
                console.log(data, '/////seen///');
                const recipientSocket = connectedUsers.get(data.recipientId)
                if (recipientSocket) {


                    recipientSocket.emit('messageSeen', data)
                }

            })

            socket.on('onlineStatusCheck', async ({ userId, socketId }) => {

                const recipientSocket = connectedUsers.get(userId)
                if (recipientSocket) {
                    io.to(socketId).emit('onlineStatus', { status: true, userId })
                } else {
                    io.to(socketId).emit('onlineStatus', { status: false, userId })

                }

            })

            /* video call */
            socket.on('calling', async ({ senderId, recipientId }) => {
                console.log(senderId, recipientId, 'calling');

                const recipientSocket = connectedUsers.get(recipientId)
                if (recipientSocket) {
                    recipientSocket.emit('incoming_call', { senderId, recipientId })
                }
            })

            socket.on('ice-candidate', ({ candidate, recipientId }) => {

                const recipientSocket = connectedUsers.get(recipientId)
                if (recipientSocket) {
                    recipientSocket.emit('ice-candidate', candidate);
                }
            });

            socket.on('offer', ({ offer, recipientId,senderId }) => {


                const recipientSocket = connectedUsers.get(recipientId)
                if (recipientSocket) {
                    recipientSocket.emit('offer',{ offer,recipientId,senderId});
                }
            });

            socket.on('answer', ({ answer, recipientId }) => {
                const recipientSocket = connectedUsers.get(recipientId)
                if (recipientSocket) {
                    recipientSocket.emit('answer', answer);
                }
            });

            socket.on('video_call_end',({recipientId})=>{
                const recipientSocket = connectedUsers.get(recipientId)
                console.log(recipientId,'rec');
                
                if (recipientSocket) {
                    recipientSocket.emit('video_call_end');
                }
            })



            socket.on('disconnect', () => {
                console.log('user disconnected', socket.id);
                connectedAdmin.delete(socket.id)
                const userId = connectedSocket.get(socket)
                connectedUsers.delete(userId)


            })

            //testng







        })
    } catch (error) {
        console.log('////', error, '////');

    }

}

export default socketIoConnect