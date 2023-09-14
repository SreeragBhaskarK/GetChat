import React, { useState, useEffect } from 'react'
import { Footer, NavSideBar, NavTopBar } from '../../widgets/layout/admin'
import { io } from 'socket.io-client'
import api from '../../services/api'
import { Link } from 'react-router-dom'

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        api.getNotificationsAdmin().then((response) => {
            console.log(response.data.data, 'notification');
            if (response.data.success) {
                setNotifications(response.data.data)
            }
        }).catch((err) => {
            console.log(err);

        })
    }, [])
    const [formData, setFormData] = useState({
        message: '',
        type: 'default',
        duration: '2.5',
        userType: 'all'

    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(notifications);
        api.sendNotificationAdmin(formData).then((response) => {
            console.log(response);
            if (response.data.success) {
                setNotifications((prevNotification) => [response.data.data, ...prevNotification])
                setFormData({
                    message: '',
                    type: 'default',
                    duration: '2.5',
                    userType: 'all'
                })
            }

        }).catch((err) => {
            console.log(err);

        })

        /*   socket.emit('notificationSend',formData) */

    }
    return (
        <>
            <NavSideBar/>
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                <NavTopBar navLocation='Notifications' />
                <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
                    <h1 className="text-xl font-bold text-white capitalize dark:text-white">Notifications Send</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                            <div>
                                <label className="text-white dark:text-gray-200" >Message</label>
                                <textarea id="textarea" onChange={handleChange} value={formData.message} name='message' required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                            </div>
                            <div>
                                <label className="text-white  dark:text-gray-200" >Type</label>
                                <select onChange={handleChange} name='type' className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                    <option value='default'>Default</option>
                                    <option className='text-green-500' value='success'>Success</option>
                                    <option className='text-yellow-500' value='waring'>Warning</option>
                                    <option className='text-red-500' value='danger'>Danger</option>
                                </select>
                            </div>



                            <div>
                                <label className="text-white dark:text-gray-200">Duration</label>
                                <select onChange={handleChange} name='duration' className="block w-full px-4 py-2 mt-2 text-gray-700  bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                    <option value='2.4'>2.5s</option>
                                    <option value='3'>3s</option>
                                    <option value='4'>4s</option>
                                    <option value='5'>5s</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-white dark:text-gray-200" >User Type</label>
                                <select onChange={handleChange} name='userType' className="block w-full px-4 py-2 mt-2 text-gray-700  bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                    <option value='all'>All</option>
                                    <option value='username'>Username</option>
                                    <option value='popularUsers'>Popular Users</option>
                                </select>
                                <div>

                                    <input type='text' onChange={handleChange} name='userType' required={formData.userType != 'all' && formData.userType != 'popularUsers'} placeholder='username type...' className={formData.userType != 'all' && formData.userType != 'popularUsers' ? "block  w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" : " hidden  w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"} />
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end mt-6">
                            <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Send</button>
                        </div>
                    </form>
                </section>
                <div className="w-full mx-auto  max-w-full px-3 mt-5 mb-6 md:mb-0  md:flex-none  lg:flex-none">
                    <div className="border-black/12.5 shadow-soft-xl relative flex w-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">

                        <div className="flex-auto p-6 px-0 pb-2">
                            <div className="overflow-x-auto">
                                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                    <thead className="align-bottom">
                                        <tr>
                                            <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">Messages</th>
                                            <th className="px-6 py-3 pl-2 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">User Type</th>
                                            <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">Type</th>
                                            <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">Completion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notifications.map((notification) => {
                                            return (
                                                <tr>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                        <div className="flex px-2 py-1">

                                                            <div className="flex flex-col justify-center">
                                                                <h6 className="mb-0 leading-normal text-sm">{notification.message}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                        {notification.user_type != 'all' && notification.user_type != 'popularUsers' ? (<div className="mt-2 avatar-group">

                                                            <Link to={`/${notification.user_type}`} className="relative z-20 inline-flex items-center justify-center w-6 h-6  text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                                <img src="../assets/img/team-2.jpg" className="w-full rounded-full" alt="team2" />
                                                            </Link>
                                                            <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                                Romina Hadid
                                                                <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                            </div>

                                                        </div>) : (<div className='mt-2'>
                                                            {notification.user_type == 'popularUsers' ? 'popular users' : 'all'}
                                                        </div>)}
                                                    </td>
                                                    <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                                                        <span className="font-semibold leading-tight text-xs"> {notification.type} </span>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                        <div className="w-3/4 mx-auto">
                                                            <div>
                                                                <div>
                                                                    <span className="font-semibold leading-tight text-xs">60%</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                                <div className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5 w-3/5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                        {/*   <tr>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-atlassian.svg" className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl" alt="atlassian" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-0 leading-normal text-sm">Add Progress Track</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="mt-2 avatar-group">
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-2.jpg" className="w-full rounded-full" alt="team5" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Romina Hadid
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-4.jpg" className="w-full rounded-full" alt="team6" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Jessica Doe
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                                                <span className="font-semibold leading-tight text-xs"> $3,000 </span>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="w-3/4 mx-auto">
                                                    <div>
                                                        <div>
                                                            <span className="font-semibold leading-tight text-xs">10%</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                        <div className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 w-1/10 -ml-px flex h-1.5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-slack.svg" className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl" alt="team7" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-0 leading-normal text-sm">Fix Platform Errors</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="mt-2 avatar-group">
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-3.jpg" className="w-full rounded-full" alt="team8" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Romina Hadid
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-1.jpg" className="w-full rounded-full" alt="team9" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Jessica Doe
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                                                <span className="font-semibold leading-tight text-xs"> Not set </span>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="w-3/4 mx-auto">
                                                    <div>
                                                        <div>
                                                            <span className="font-semibold leading-tight text-xs">100%</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                        <div className="duration-600 ease-soft bg-gradient-to-tl from-green-600 to-lime-400 -mt-0.38 -ml-px flex h-1.5 w-full flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-spotify.svg" className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl" alt="spotify" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-0 leading-normal text-sm">Launch our Mobile App</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="mt-2 avatar-group">
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-4.jpg" className="w-full rounded-full" alt="user1" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Ryan Tompson
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-3.jpg" className="w-full rounded-full" alt="user2" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Romina Hadid
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-4.jpg" className="w-full rounded-full" alt="user3" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Alexander Smith
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-1.jpg" className="w-full rounded-full" alt="user4" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Jessica Doe
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                                                <span className="font-semibold leading-tight text-xs"> $20,500 </span>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="w-3/4 mx-auto">
                                                    <div>
                                                        <div>
                                                            <span className="font-semibold leading-tight text-xs">100%</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                        <div className="duration-600 ease-soft bg-gradient-to-tl from-green-600 to-lime-400 -mt-0.38 -ml-px flex h-1.5 w-full flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-jira.svg" className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl" alt="jira" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-0 leading-normal text-sm">Add the New Pricing Page</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="mt-2 avatar-group">
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-4.jpg" className="w-full rounded-full" alt="user5" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Ryan Tompson
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                                                <span className="font-semibold leading-tight text-xs"> $500 </span>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                <div className="w-3/4 mx-auto">
                                                    <div>
                                                        <div>
                                                            <span className="font-semibold leading-tight text-xs">25%</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                        <div className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5 w-1/4 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={25}></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                                                <div className="flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-invision.svg" className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl" alt="invision" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-0 leading-normal text-sm">Redesign New Online Shop</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                                                <div className="mt-2 avatar-group">
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-1.jpg" className="w-full rounded-full" alt="user6" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Ryan Tompson
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                    <a href="javascript:;" className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30" data-target="tooltip_trigger" data-placement="bottom">
                                                        <img src="../assets/img/team-4.jpg" className="w-full rounded-full" alt="user7" />
                                                    </a>
                                                    <div data-target="tooltip" className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm" role="tooltip">
                                                        Jessica Doe
                                                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 leading-normal text-center align-middle bg-transparent border-0 text-sm whitespace-nowrap">
                                                <span className="font-semibold leading-tight text-xs"> $2,000 </span>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                                                <div className="w-3/4 mx-auto">
                                                    <div>
                                                        <div>
                                                            <span className="font-semibold leading-tight text-xs">40%</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                        <div className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5 w-2/5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={40}></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>

        </>
    )
}

export default Notifications