import api from "../../services/api"
import { postSocket, socket } from "../../services/socketIo"
import { Footer, NavSideBar, NavTopBar } from "../../widgets/layout/admin"
import { useEffect, useState, useCallback } from 'react'
import Chart from 'chart.js/auto';
import { LinearScale, CategoryScale } from 'chart.js';
import { chart2 } from '../../assets/Admin/chart2'
import { chart1 } from '../../assets/Admin/chart1'
import { AdvertisingOverview, PostReportOverview, UserOverview, WeekNotifications } from "../../Components/dashboad";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import {PiUsersThreeLight} from 'react-icons/pi'
import { BsFilePost } from "react-icons/bs";
import {GoReport} from 'react-icons/go'

// Register the scale types
Chart.register(LinearScale, CategoryScale);

export const Dashboard = () => {
    const [activeUser, setActiveUser] = useState(0)
    const [newUsers, setNewUsers] = useState(0)
    const [newReports, setNewReports] = useState(0)
    const [popularUsers, setPopularUsers] = useState([])
    const [newPost, setNewPost] = useState(0)


    useEffect(() => {
        setInterval(() => {
            socket.emit('userActiveAdmin', socket.id)
            socket.emit('admin')
        }, 10000)
        socket.on('userActiveAdmin', handleActiveUser)
        postSocket.on('postDashboard', handlePost)
        console.log(postSocket.id, '////////////sockkdkkffj');

        postSocket.emit('postDashboard', { type: 'day', socketId: postSocket.id })

        return (() => {
            socket.off('userActiveAdmin', handleActiveUser)
            postSocket.off('postDashboard', handlePost)
        })

    }, [socket, postSocket])



    useEffect(() => {
        api.getUserDashboard('day', 'day').then((response) => {
            if (response.data.success) {

                setNewUsers(response.data.data)
            }
        }).catch((err) => {
            console.log(err);

        })
        api.getPostReportsDashboard('day', 'day').then((response) => {
            if (response.data.success) {

                setNewReports(response.data.data)
            }
        }).catch((err) => {
            console.log(err);

        })

        api.getPopularUsersDashboard().then((response) => {
            if (response.data.success) {

                setPopularUsers(response.data.data)
            }
        }).catch((err) => {
            console.log(err);

        })

    }, [])

    useEffect(() => {

        try {



            /*  const ctx = document.getElementById("chart-bars")
             chart1(ctx) */



        } catch (error) {
            console.log(error);

        }
        /*    if (canvas) {
             const ctx = canvas.getContext('2d');
       
             if (ctx) {
               new Chart(ctx, {
                 type: 'line',
                 data: data,
                 options: options,
               });
             }
           } */
    }, [chart2]);

    const handlePost = useCallback((data) => {
        setNewPost(data.result)
    }, [])








    const handleActiveUser = useCallback((data) => {
        console.log(data, 'admin');

        setActiveUser(data.count)
    }, [])




    return (
        <>
            <NavSideBar />
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                <NavTopBar navLocation='Dashboard' />
                <div className="w-full px-6 py-6 mx-auto">
                    <div className="flex flex-wrap -mx-3">

                        <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3">
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm">Active Users</p>
                                                <h5 className="mb-0 font-bold">
                                                    {activeUser}
                                                    {/*   <span className="leading-normal text-sm font-weight-bolder text-lime-500">+55%</span> */}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="px-3 text-right basis-1/3">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white">
                                                <FiUsers className="m-auto" />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3">
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm">Today's New Users</p>
                                                <h5 className="mb-0 font-bold">
                                                    {newUsers}
                                                    {/* <span className="leading-normal text-sm font-weight-bolder text-lime-500">+3%</span> */}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="px-3 text-right basis-1/3">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-world text-lg relative top-3.5 text-white">
                                                    <PiUsersThreeLight className='m-auto' />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3">
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm">Today's New Posts</p>
                                                <h5 className="mb-0 font-bold">
                                                    {newPost}
                                                    {/*     <span className="leading-normal text-red-600 text-sm font-weight-bolder">-2%</span> */}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="px-3 text-right basis-1/3">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-paper-diploma text-lg relative top-3.5 text-white">
                                                    <BsFilePost className='m-auto'/>
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3">
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm">Today's Reports</p>
                                                <h5 className="mb-0 font-bold">
                                                    {newReports}
                                                    {/*   <span className="leading-normal text-sm font-weight-bolder text-lime-500">+5%</span> */}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="px-3 text-right basis-1/3">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-cart text-lg relative top-3.5 text-white">
                                                    <GoReport className='m-auto'/>
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="flex flex-wrap mt-6 -mx-3">

                        <UserOverview />
                        
                        <AdvertisingOverview />
                        <PostReportOverview />
                        <WeekNotifications />


                    </div>



                    <div className="flex flex-wrap my-6 -mx-3">


                        <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/3 lg:flex-none">
                            <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                                    <div className="flex flex-wrap mt-0 -mx-3">
                                        <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
                                            <h6>Popular Users</h6>
                                           {/*  <p className="mb-0 leading-normal text-sm">
                                                <i className="fa fa-check text-cyan-500"></i>
                                                <span className="ml-1 font-semibold">30 done</span>
                                                this month
                                            </p> */}
                                           
                                        </div>
                                        <div className="flex-none w-5/12 max-w-full px-3 my-auto text-right lg:w-1/2 lg:flex-none">
                                            <div className="relative pr-6 lg:float-right">
                                                <a dropdown-trigger className="cursor-pointer" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-slate-400"></i>
                                                </a>
                                                <p className="hidden transform-dropdown-show"></p>

                                                <ul dropdown-menu className="z-100 text-sm transform-dropdown shadow-soft-3xl duration-250 before:duration-350 before:font-awesome before:ease-soft min-w-44 -ml-34 before:text-5.5 pointer-events-none absolute top-0 m-0 mt-2 list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all before:absolute before:top-0 before:right-7 before:left-auto before:z-40 before:text-white before:transition-all before:content-['\f0d8']">
                                                    <li className="relative">
                                                        <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300" href="javascript:;">Action</a>
                                                    </li>
                                                    <li className="relative">
                                                        <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300" href="javascript:;">Another action</a>
                                                    </li>
                                                    <li className="relative">
                                                        <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300" href="javascript:;">Something else here</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-auto p-6 px-0 pb-2">
                                    <div className="overflow-x-auto">
                                        <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                            <thead className="align-bottom">
                                                <tr>
                                                    <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">Usersname</th>
                                                    <th className="px-6 py-3 pl-2 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">followers</th>
                                                    <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">following</th>
                                                    <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">view</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {popularUsers.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                                                <div className="flex px-2 py-1">
                                                                    <div>
                                                                        <img src={user.profile_pic} className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl" alt="xd" />
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 leading-normal text-sm">{user.username}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 align-middle  bg-transparent border-b whitespace-nowrap">
                                                                <span className="font-semibold leading-tight text-xs">{user.followers.length} </span>
                                                            </td>
                                                            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                                                                <span className="font-semibold leading-tight text-xs"> {user.following.length} </span>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent flex justify-center border-b whitespace-nowrap">
                                                                <Link className="" to={`/${user.username}`}>
                                                            <button type="button" className="inline-block px-6 py-3 mr-3 font-bold text-center uppercase align-middle transition-all bg-transparent border rounded-lg cursor-pointer border-fuchsia-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-fuchsia-500">View</button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                     


                    </div>


                </div>
                <Footer />
            </main>
        </>
    )
}

export default Dashboard