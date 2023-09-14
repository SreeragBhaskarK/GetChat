import io from 'socket.io-client'
export const socket =  io('http://localhost:3000', { withCredentials: true })
export const postSocket = io('http://localhost:3001',{withCredentials:true})
