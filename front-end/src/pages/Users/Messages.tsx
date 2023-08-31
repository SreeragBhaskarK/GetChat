import React, { useEffect, useState } from 'react'
import { ChatBox } from '../../Components'
import { NavSideBar } from '../../widgets/layout/user'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import api from '../../services/api'
import { useLocation } from 'react-router-dom'
const socket = io('http://localhost:3000', { withCredentials: true })
export const Messages = () => {
    const [indexUser, setindexUser] = useState(0)
    const [chatUser, setChatUser] = useState([])
    const [userData, setUserData] = useState()
    const userDetail = useSelector((state: any) => state.user.userData)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const paramValue = searchParams.get('userId');
    console.log(paramValue, '////////////jshjdhf');

    const handleClick = (index, user) => {
        setUserData(user)
        setindexUser(index)
    }
    useEffect(() => {
        socket.emit('auth', userDetail._id)
        if (paramValue) {
            api.chatCreate({ firstId: paramValue, secondId: userDetail._id }).then((response) => {
                console.log(response, '////skjdsdh');
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





    }, [userDetail])


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
                                    <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                                        placeholder="Search" required />
                                </div>
                            </div>

                            <ul className="overflow-auto h-[32rem]">
                                <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                                <li>
                                    {chatUser?.map((user, index) => {
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
                                                        <span className="block ml-2 text-sm text-gray-600">25 minutes</span>
                                                    </div>
                                                    <span className="block ml-2 text-sm text-gray-600">bye</span>
                                                </div>
                                            </a>
                                        )
                                    })
                                    }
                                </li>
                            </ul>
                        </div>
                        <ChatBox userData={userData} socket={socket} senderId={userDetail._id} />
                    </div>
                    {/*  <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={sendMessage}>Send</button> */}
                </div >
            </main>
        </>
    )
}

export default Messages