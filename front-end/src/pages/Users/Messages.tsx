import React, { useEffect, useState, useCallback, memo } from 'react'
import { ChatBox } from '../../Components'
import { NavRightSide, NavSideBar } from '../../widgets/layout/user'

import { useSelector } from 'react-redux'
import api from '../../services/api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { socket } from '../../services/socketIo'
import { ShimmerMessage, ShimmerSearch } from '../../widgets/shimmerEffects'
import { FcVideoCall } from 'react-icons/fc'

export const Messages = () => {
    const [indexUser, setindexUser] = useState(0)
    const [chatUser, setChatUser] = useState([])
    const [userData, setUserData] = useState()
    const userDetail = useSelector((state: any) => state.user.userData)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingSearch, setisLoadingSearch] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const paramValue = searchParams.get('userId');
   




    const [messageInd, setMessageInd] = useState(useSelector((state: any) => state.message.messages_count))
    const [searchKey, setSearchKey] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const videoCall = useSelector((state: any) => state.video_call.videoCall)
    const handleClick = (index, user) => {
    

        setUserData(user)
        setindexUser(index)
    }

    useEffect(() => {
        if (searchKey && userDetail) {
            setisLoadingSearch(true)
            api.userSearch(searchKey, userDetail.username).then((response) => {
             
                if (response.data.success) {
                    setisLoadingSearch(false)
                    setSuggestions(response.data.data)
                }
            }).catch((err) => {
                console.log(err);

            })
        }

    }, [searchKey, userDetail])

    useEffect(() => {
        socket.on('onlineStatus', handleUserOnlineStatus)

    }, [socket])

    /* useEffect(() => {
        console.log('chaindfgkndat');

        setMessageInd(messageCount[0])
    }, [messageCount]) */
    useEffect(() => {
        setIsLoading(true)
        if (paramValue) {
         
            navigate({
                pathname: location.pathname
            })
            searchParams.delete('userId');
            api.chatCreate({ firstId: paramValue, secondId: userDetail._id }).then((response) => {
               



                api.getChats(userDetail._id).then((response) => {

              
                    if (response.data.success) {
                        setChatUser(response.data.data)
                        setIsLoading(false)
                        if (paramValue) {
                            const result = response.data.data.findIndex(item => item.members.some(member => member === paramValue))
                            if (result !== -1) {
                                setUserData(response.data.data[result])
                                setindexUser(result)
                            } else {

                                setUserData(response.data.data[0])
                            }
                        } else {

                            setUserData(response.data.data[0])
                        }
                    }

                }).catch((err) => {

                    console.log(err);

                })



            }).catch((err) => {
                api.getChats(userDetail._id).then((response) => {

                  
                    if (response.data.success) {
                        setChatUser(response.data.data)
                        setIsLoading(false)
                        if (paramValue) {
                            const result = response.data.data.findIndex(item => item.members.some(member => member === paramValue))
                            if (result !== -1) {
                                setUserData(response.data.data[result])
                                setindexUser(result)
                            } else {

                                setUserData(response.data.data[0])
                            }
                        } else {

                            setUserData(response.data.data[0])
                        }
                    }



                }).catch((err) => {
                    console.log(err);

                })
                console.log(err);

            })
        } else {
            api.getChats(userDetail._id).then((response) => {

                console.log(response, '/////////messages🚀🚀🚀🚀');
                if (response.data.success) {
                    setChatUser(response.data.data)
                    setIsLoading(false)
                    if (paramValue) {
                        const result = response.data.data.findIndex(item => item.members.some(member => member === paramValue))
                        if (result !== -1) {
                            setUserData(response.data.data[result])
                            setindexUser(result)
                        } else {

                            setUserData(response.data.data[0])
                        }
                    } else {


                        setUserData(response.data.data[0])
                    }
                }

            }).catch((err) => {
                console.log(err,'check');

            })
        }





    }, [userDetail, paramValue])

    const handleUserOnlineStatus = useCallback((data) => {
     
        setChatUser((prevChat) =>
            prevChat.map((chat) => {
                const recipientId =
                    chat?.memberDetails[0]._id === userDetail._id
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
    /*     const previousMessageTime = useCallback((data) => {
            if (data) {
                console.log(data, '/callback');
                if (data?.updatedAt && data.senderId != userDetail._id) {
    
                    const parsedTimestamp = new Date(data?.updatedAt);
                    const ago = formatDistanceToNow(parsedTimestamp, { addSuffix: true });
                    setTimeAgo(ago)
                } else {
                    setTimeAgo('')
                }
                if (data.content && data.senderId != userDetail._id) {
    
                    setLastMessage(data?.content)
                } else {
                    setLastMessage('')
                }
            }
    
        }, []) */






    return (
        <>

           {/*  <NavSideBar /> */}
            <main className="ease-soft-in-out ml-40  xl:ml-[17rem]   relative h-screen  max-h-screen rounded-xl min-h-screen transition-all duration-200">
                <div className="container mx-auto h-full ">
                    <div className="w-full border h-full flex  rounded lg:grid lg:grid-cols-3">
                        <div className="border-r h-screen overflow-y-auto no-scrollbar border-gray-300 lg:col-span-1">
                            <div className="mx-3 hidden lg:block my-3">
                                <div className="relative text-gray-600">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </span>
                                    <input type="search" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                                        placeholder="Search" required />
                                </div>
                                {

                                    searchKey && isLoadingSearch ? <>
                                        <div className=' w-full border-t relative z-10  '>
                                            <ul className='absolute w-full my-2   '>
                                                {Array.from({ length: 6 }).map((_, index) => (
                                                    <li className='my-2 pt-2 pl-2 flex border rounded-lg bg-gray-400 flex-row items-center gap-4' >
                                                        <ShimmerSearch />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </> : searchKey && <div className=' w-full border-t relative z-10  '>
                                        <ul className='absolute w-full  bg-gray-600 rounded-lg'>
                                            {suggestions.map((suggestion, index) => (
                                                <li key={index}><Link onClick={() => { setSearchKey(''); setSuggestions([]) }} to={`/messages?userId=${suggestion._id}`}>  <div className='flex flex-row items-center gap-4'>
                                                    <img src={suggestion.profile_pic ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'}
                                                        className='h-10 w-10 rounded-full object-cover' />
                                                    <span className='text-white'>{suggestion.username}</span>
                                                </div></Link></li>
                                            ))}
                                        </ul>
                                    </div>}
                            </div>

                            <ul className=" ">
                                <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>

                                {isLoading ? <>
                                    {Array.from({ length: 20 }).map((_, index) => (
                                        <li key={index}>
                                            <ShimmerMessage />
                                        </li>
                                    ))}
                                </> :

                                    chatUser?.map((user, index) => {
                                 
                                    
                                        const recipientId = user?.memberDetails[0]?._id === userDetail?._id ? user?.memberDetails[1]?._id : user?.memberDetails[0]?._id
                                  

                                        const result = messageInd?.findIndex((message) => message?.recipientId == recipientId)
                                        let count = 0
                                        if (result != -1) {
                                            count = messageInd[result]?.count
                                        }
                                    

                                         setInterval(() => {
                                               socket.emit('onlineStatusCheck', { userId: recipientId, socketId: socket.id })
                                           }, 10 * 1000)

                                        let checkDeleteMessage = false
                                        if (user.delete_user_id) {

                                            checkDeleteMessage = user.delete_user_id.some((userId) => userId == userDetail._id)
                                        }
                                        let timeAgo = ''
                                        let lastMessage = ''


                                        if (messageInd || user.lastMessage) {



                                            if (messageInd) {
                                                const findIndex = messageInd.findIndex((message) => message.recipientId == recipientId)
                                 
                                                if (messageInd[findIndex]?.message?.updatedAt && messageInd[findIndex]?.message?.senderId != userDetail?._id) {
                                                    if (messageInd[findIndex]?.message?.updatedAt > user.last_message.updatedAt) {

                                                        const parsedTimestamp = new Date(messageInd[findIndex]?.message?.updatedAt);
                                                        const ago = formatDistanceToNow(parsedTimestamp, { addSuffix: true });
                                                        timeAgo = ago

                                                        lastMessage = messageInd[findIndex]?.message?.content

                                                    } else {
                                                        if (userDetail._id !== user.last_message.senderId) {
                                                            const parsedTimestamp = new Date(user?.last_message?.updatedAt);
                                                            const ago = formatDistanceToNow(parsedTimestamp, { addSuffix: true });
                                                            timeAgo = ago
                                                            lastMessage = user?.last_message?.content
                                                        }

                                                    }
                                                }

                                            }





                                        }
                                        return !checkDeleteMessage && (
                                            <li >
                                                <a onClick={() => handleClick(index, user)}
                                                    className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer  ${indexUser == index ? 'bg-gray-100' : 'hover:bg-gray-100'} focus:outline-none`}>
                                                    <div className="relative flex items-center p-3  border-gray-300">
                                                        <img className="object-cover w-10 h-10 rounded-full"
                                                            src={user.memberDetails[0].username === userDetail.username
                                                                ? user.memberDetails[1].profile_pic
                                                                : user.memberDetails[0].profile_pic} alt="username" />


                                                        {user.status ? <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                                                        </span> : <span className="absolute w-3 h-3 bg-red-600 rounded-full left-10 top-3">
                                                        </span>}


                                                    </div>
                                                    <div className="w-full pb-2 hidden lg:block">
                                                        <div className="flex justify-between">
                                                            <span className="block ml-2 font-semibold text-gray-600">
                                                                {user.memberDetails[0].username === userDetail.username
                                                                    ? user.memberDetails[1].username
                                                                    : user.memberDetails[0].username}
                                                            </span>
                                                            <span className="block ml-2 text-sm text-gray-600">{timeAgo}</span>
                                                        </div>
                                                        <div className='relative'>
                                                            <span className="block ml-2 text-sm text-gray-600">{lastMessage}</span>
                                                            {count > 0 && <span className="inline-flex absolute  items-center justify-center   ml-2 text-[8px] text-white font-semibold   w-3 h-3 bg-rose-600 rounded-full left-4 top-0">
                                                                {count}
                                                            </span>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {videoCall.senderId == recipientId && <FcVideoCall className='animate-pulse' />}
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                        {chatUser.length > 0 && <ChatBox userData={userData} senderId={userDetail._id} setIndexUser={setindexUser} setChat={setChatUser} />}
                    </div>
                    {/*  <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={sendMessage}>Send</button> */}
                </div >
            </main>
        </>
    )
}

export default memo(Messages)