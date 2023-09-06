import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { socket } from '../services/socketIo'
import api from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData } from '../redux/userSlice'



export const Notifications = ({ open, setOpen }) => {
    const [notifications, setNotifications] = useState([])
    const userData = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch()
    useEffect(() => {
        socket.on('notification', (data) => {
            console.log(data, '//////data');
            setNotifications((prevNotification) => [...prevNotification, data])

        })
        api.getNotifications(userData.username).then((response) => {
            console.log(response);

            if (response.data.success) {
                setNotifications(response.data.data)
            }
        }).catch((err) => {
            console.log(err);

        })
    }, [])


    const follow = (username,userId) => {
        
        console.log(username);
        api.putFollow({ followUserName: username, user: userData.username }).then((response) => {
            console.log(response);

            if (response.data.success) {
                dispatch(addUserData(response.data.data))
                socket.emit('following', { sender_username: userData.username, senderId: userData._id, recipient_username: username, recipientId: userId, message: 'started following you.' })
            }

        }).catch((err) => {
            console.log(err);

        })
    }

    const unfollow = (username) => {
        console.log(username);
        
        api.deleteFollow({ followUserName: username, user: userData.username }).then((response) => {
            console.log(response);

            if (response.data.success) {
                dispatch(addUserData(response.data.data))
            }

        }).catch((err) => {
            console.log(err);

        })
    }
    return (
        <><Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(!open)}
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                Notifications
                                            </Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">

                                            {notifications.map((notification,index) => {
                                                const result = userData.following.some((username) => username == notification.sender_username)
                                                return (

                                                    <div key={index} className='flex flex-row items-center overflow-hidden m-4 '>
                                                        <div className=' gap-4'>
                                                            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'}
                                                                className='h-10 w-10 rounded-full object-cover' />
                                                        </div>
                                                        <div className='gap-4 ml-2 flex text-ellipsis'>
                                                            <span>{notification.sender_username}</span>
                                                            <span>{notification.message}</span>
                                                        </div>
                                                        <div className='gap-4 '>
                                                            {

                                                                result ? (<button onClick={()=>unfollow(notification.sender_username)} className="bg-slate-100 px-2 py-1  text-black font-semibold text-sm rounded  text-center sm:inline-block block">following</button>) : (<button onClick={()=>follow(notification.sender_username,notification.senderId)} className="bg-blue-500 px-2 py-1  text-white font-semibold text-sm rounded  text-center sm:inline-block block">follow</button>)}
                                                        </div>

                                                    </div>


                                                )
                                            })
                                            }

                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root></>
    )
}

export default Notifications