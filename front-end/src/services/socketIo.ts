import io from 'socket.io-client'
const {VITE_USER_SERVICE_URL,VITE_POST_SERVICE_URL} = import.meta.env
console.log(VITE_USER_SERVICE_URL,'user urll');

export const socket =  io(VITE_USER_SERVICE_URL, { withCredentials: true })
export const postSocket = io(VITE_POST_SERVICE_URL,{withCredentials:true})
