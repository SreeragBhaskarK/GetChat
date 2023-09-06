import React, { useEffect, useState } from 'react'
import api from '../services/api';
import { useDispatch } from 'react-redux';

import { MdDelete } from 'react-icons/md'
import { AiFillInfoCircle } from 'react-icons/ai'
import { DeleteChatBox } from '../widgets/cards';

import { messagesIndication } from '../redux/userSlice';
import { socket } from '../services/socketIo';
import { decreamentMessageCount, increaseMessageCount } from '../redux/messageSlice';


export const ChatBox = ({ userData, senderId, setChat, timeAgoCallBack }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
   /*  const [listen, setListen] = useState(false) */
    const [deleteChat, setDeleteChat] = useState(false)
    const dispatch = useDispatch()
    const sendMessage = (e) => {
        e.preventDefault()
        if (message.trim() !== '') {


            socket.emit('private_message', {
                recipientId:userData?.memberDetails[0]?._id === senderId
                ? userData?.memberDetails[1]._id
                : userData?.memberDetails[0]._id,
                senderId: senderId,
                content: message,
                chatId: userData._id
            });
            setMessages((prevMessage)=>[...prevMessage, {
                chatId: userData._id, content: message, recipientId: userData.memberDetails[0]._id === senderId
                    ? userData.memberDetails[1]._id
                    : userData.memberDetails[0]._id, senderId
            }])
            setMessage('')

        }
    }

    


    useEffect(() => {
        console.log(userData,'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
       
        api.getMessage({ chatId: userData?._id }).then((response) => {
            console.log(response);
            if (response.data.success) {
                setMessages(response.data.data)
              
            }

        }).catch((err) => {
            console.log(err);

        })



    }, [userData])

    useEffect(() => {
        /* console.log(messages[messages.length-1]?.updatedAt,'/agoo'); */

        timeAgoCallBack(messages[messages.length - 1])

    }, [messages])

    useEffect(() => {
        
        const recipientId = userData?.memberDetails[0]._id === senderId ? userData?.memberDetails[1]._id : userData?.memberDetails[0]._id
        socket.on('private_message',(data)=>{
            console.log(userData,'userData');
            console.log(data, '//////messaging//////');
            console.log(socket.id,'/////////socketId')
            console.log(recipientId,'recIdikkkkkkk😁😁');
            dispatch(increaseMessageCount(data?.senderId))
            if (data != '' && recipientId ==data.senderId) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        } );
        dispatch(decreamentMessageCount(recipientId))
        return () => {
            // Cleanup function to remove the event listener when the component unmounts.
            socket.off('private_message');
            
        };
    }, [userData])
    const messageDelete = (id) => {
        api.deleteMessage(id).then((response) => {
            console.log(response);

            if (response.data.success) {
                setMessages(messages.filter((message) => message._id != id))
            }
        }).catch((err) => {
            console.log(err);

        })

    }

    return (
        <>
            <div className="hidden lg:col-span-2 lg:block">
                <div className="w-full">
                    <div className="relative flex items-center p-3 border-b border-gray-300">
                        <img className="object-cover w-10 h-10 rounded-full"
                            src={userData?.memberDetails[0]._id === senderId
                                ? userData?.memberDetails[1].profile_pic
                                : userData?.memberDetails[0].profile_pic} alt="username" />
                        <span className="block ml-2 font-bold text-gray-600">{userData?.memberDetails[0]._id === senderId
                            ? userData?.memberDetails[1].username
                            : userData?.memberDetails[0].username}</span>
                        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                        </span>

                        <AiFillInfoCircle onClick={() => setDeleteChat(!deleteChat)} className='ml-auto' />
                    </div>
                    {deleteChat && <DeleteChatBox setDeleteChat={setDeleteChat} chatId={userData._id} deleteChat={deleteChat} setChat={setChat} />}
                    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                        <ul className="space-y-2">
                            {messages.map((messageContent, index) => {
    

                                if (messageContent?.senderId !== senderId && messageContent.seen == false) {
                                    api.changeSeen({ messageId: messageContent._id }).then((response) => {
                                        console.log(response);
                                        if (response.data.success) {
                                            let prevMessage = messages
                                            prevMessage[index] = response.data.data
                                            setMessages(prevMessage)
                                        }

                                    }).catch((err) => {
                                        console.log(err);

                                    })
                                }
                                
                                
                                return (<li className={messageContent?.senderId === senderId ? "flex justify-end" : "flex justify-start"}>
                                    {messageContent?.senderId === senderId  && <div onClick={() => messageDelete(messageContent?._id)}   className='cursor-pointer hover:block hidden'> <MdDelete /></div>}
                                    <div  className="relative cursor-pointer max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                        <span className="block">{messageContent?.content}</span>
                                    </div>
                                </li>)
                            }
                            )}
                        </ul>
                        {messages[messages.length - 1]?.senderId === senderId && messages[messages.length - 1]?.seen == true && <span className="block mt-2 text-sm float-right">seen</span>}
                    </div>


                    <form onSubmit={sendMessage}>
                        <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </button>

                            <input type="text" placeholder="Message"
                                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                                name="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                            <button type="submit">
                                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default ChatBox