import React, { useEffect, useState, useCallback } from 'react'
import { ChatBox } from '../../Components'
import { NavSideBar } from '../../widgets/layout/user'

import { useSelector } from 'react-redux'
import api from '../../services/api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'


export const Messages = () => {
    const [indexUser, setindexUser] = useState(0)
    const [chatUser, setChatUser] = useState([])
    const [userData, setUserData] = useState()
    const userDetail = useSelector((state: any) => state.user.userData)

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const paramValue = searchParams.get('userId');
    console.log(paramValue, '////////////jshjdhf');

    const [timeAgo, setTimeAgo] = useState('')
    const [lastMessage, setLastMessage] = useState('')

    const messageCount = useState(useSelector((state: any) => state.message.messages_count))
    const [messageInd, setMessageInd] = useState(messageCount[0])
    const [searchKey, setSearchKey] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const handleClick = (index, user) => {
        console.log(user, 'userrrrrrrrrr🔥🔥🔥🔥');

        setUserData(user)
        setindexUser(index)
    }

    useEffect(() => {
        api.userSearch(searchKey, userDetail.username).then((response) => {
            console.log(response, 'search');
            if (response.data.success) {
                setSuggestions(response.data.data)
            }
        }).catch((err) => {
            console.log(err);

        })

    }, [searchKey, userDetail])

    useEffect(() => {
        setMessageInd(messageCount[0])
    }, [messageCount])
    useEffect(() => {

        if (paramValue) {
            api.chatCreate({ firstId: paramValue, secondId: userDetail._id }).then((response) => {
                console.log(response, '////skjdsdh');

                searchParams.delete('userId');

                navigate({
                    pathname: window.location.pathname, // Keep the same pathname
                    search: searchParams.toString(), // Set the updated search query
                });

                api.getChats(userDetail._id).then((response) => {

                    console.log(response, '/////////messages');
                    if (response.data.success) {
                        setChatUser(response.data.data)
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

                    console.log(response, '/////////messages');
                    if (response.data.success) {
                        setChatUser(response.data.data)
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

                console.log(response, '/////////messages');
                if (response.data.success) {
                    setChatUser(response.data.data)
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
        }





    }, [userDetail,paramValue])

    const previousMessageTime = useCallback((data) => {
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

    }, [])


    return (
        <>

            <NavSideBar />
            <main className="ease-soft-in-out xl:ml-68.5 xl:mr-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
                <div className="container mx-auto">
                    <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
                        <div className="border-r border-gray-300 lg:col-span-1">
                            <div className="mx-3 my-3">
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
                                {searchKey &&<div className=' w-full border-t relative z-10  '>
                                    <ul className='absolute w-full bg-gray-600 rounded-lg'>
                                        {suggestions.map((suggestion, index) => (
                                            <li key={index}><Link onClick={()=>{setSearchKey('');setSuggestions([])}} to={`/messages?userId=${suggestion._id}`}>  <div className='flex flex-row items-center gap-4'>
                                                <img src={suggestion.profile_pic ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'}
                                                    className='h-10 w-10 rounded-full object-cover' />
                                                <span className='text-white'>{suggestion.username}</span>
                                            </div></Link></li>
                                        ))}
                                    </ul>
                                </div>}
                            </div>

                            <ul className="overflow-auto h-[32rem]">
                                <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                                <li>
                                    {chatUser?.map((user, index) => {
                                        const recipientId = user?.memberDetails[0]._id === userDetail._id ? user?.memberDetails[1]._id : user?.memberDetails[0]._id
                                        console.log(messageInd, 'message');

                                        const result = messageInd?.findIndex((message) => message.recipientId == recipientId)
                                        let count = 0
                                        if (result != -1) {
                                            count = messageInd[result]?.count
                                        }
                                        console.log(count, result, 'count');

                                        return (

                                            <a onClick={() => handleClick(index, user)}
                                                className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer  ${indexUser == index ? 'bg-gray-100' : 'hover:bg-gray-100'} focus:outline-none`}>
                                                <div className="relative flex items-center p-3  border-gray-300">
                                                    <img className="object-cover w-10 h-10 rounded-full"
                                                        src={user.memberDetails[0].username === userDetail.username
                                                            ? user.memberDetails[1].profile_pic
                                                            : user.memberDetails[0].profile_pic} alt="username" />
                                                    <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                                                    </span>
                                                </div>
                                                <div className="w-full pb-2">
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
                                            </a>
                                        )
                                    })
                                    }
                                </li>
                            </ul>
                        </div>
                        {chatUser.length>0&&<ChatBox userData={userData} timeAgoCallBack={previousMessageTime} senderId={userDetail._id} setChat={setChatUser} />}
                    </div>
                    {/*  <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={sendMessage}>Send</button> */}
                </div >
            </main>
        </>
    )
}

export default Messages