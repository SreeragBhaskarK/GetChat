import React,{useState,useEffect,useCallback} from 'react'
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { socket } from '../../../services/socketIo';



export const NavTopSide = ({userData}) => {
    const [chatUser, setChatUser] = useState([])

    useEffect(() => {
        api.getChats(userData._id).then((response) => {

            console.log(response, '/////////messages,status');
            if (response.data.success) {

                setChatUser(response.data.data)
            }

        }).catch((err) => {

            console.log(err);

        })
    }, [userData])
    useEffect(() => {
        socket.on('onlineStatus', handleUserOnlineStatus)

    }, [socket])

    const handleUserOnlineStatus = useCallback((data) => {
        console.log(data, 'online status');
        setChatUser((prevChat) =>
            prevChat.map((chat) => {
                const recipientId =
                    chat?.memberDetails[0]._id === userData._id
                        ? chat?.memberDetails[1]._id
                        : chat?.memberDetails[0]._id;
                if (recipientId === data.userId) {
                    // Create a new chat object with the updated status
                    if (chat.status != data.status) {
                        return { ...chat, status: data.status };
                    }
                }
                // Return the original chat object if it doesn't need to be updated
                return chat;
            })
        );
    }, []);

    return (
        <>
            {chatUser.length > 0 && <div className="w-full max-w-full px-3 mb-6   sm:flex-none xl:mb-0 ">
                <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="flex-auto p-4 overflow-x-auto no-scrollbar  scroll">
                        <div className="flex   flex-row -mx-3">

                            {chatUser.map((user) => {
                                const userDetails = user?.memberDetails[0]._id === userData._id ? user?.memberDetails[1] : user?.memberDetails[0]
                                console.log(userDetails, 'user story');
                            /*     setInterval(() => {
                                    socket.emit('onlineStatusCheck', { userId: userDetails._id, socketId: socket.id })
                                }, 10 * 1000) */
                                return (
                                    <Link to={`/messages?userId=${userDetails._id}`} className="px-3  ">
                                        <div className="relative flex items-center p-3  border-gray-300">
                                            <img className="object-cover w-10 h-10 rounded-full"
                                                src={userDetails.profile_pic} alt="username" />
                                            {user.status ? <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                                            </span> : <span className="absolute w-3 h-3 bg-red-600 rounded-full left-10 top-3">
                                            </span>}
                                        </div>
                                        <div className="flex justify-center">
                                            <span className=" text-xs relative  text-black">{userDetails.username}</span>
                                        </div>
                                    </Link>
                                )
                            })}


                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default NavTopSide