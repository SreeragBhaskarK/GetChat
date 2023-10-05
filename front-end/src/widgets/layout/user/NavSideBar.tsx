import { useEffect, useState, useCallback, memo } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Notifications, Search, Uploader } from "../../../Components"
import { useDispatch, useSelector } from "react-redux"
import { CgDetailsMore, CgProfile } from 'react-icons/cg'
import { BiSearchAlt } from 'react-icons/bi'
import { AiTwotoneMessage } from 'react-icons/ai'
import { loginCheck, messagesIndication } from "../../../redux/userSlice"
import api from "../../../services/api"
import { socket } from "../../../services/socketIo"
import { increaseMessageCount } from "../../../redux/messageSlice"
import { addVideoCall } from "../../../redux/callSlice"
import webRTC from "../../../services/webRTC"
import { toast } from "react-toastify"
import { MdExplore, MdUploadFile } from "react-icons/md"
import { IoMdNotifications } from 'react-icons/io'
import { UploadPost } from "../../../Components/uploadPost"



export const NavSideBar = () => {
    const [uploader, setUploader] = useState(false)
    const username = useSelector((state: any) => state.user?.userData.username)
    const userData = useSelector((state: any) => state.user?.userData)
    const [search, setSearch] = useState(false)
    const dispatch = useDispatch()
    const messageIndication = useSelector((state: any) => state.message?.messages_count)
    const videoCall = useSelector((state: any) => state.video_call.videoCall)
    const [notifications, setNotifications] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedItem, setSelectedItem] = useState(location.pathname.split('/').pop())

    useEffect(() => {
        console.log(location.pathname.split('/').pop(), '////////');
        const routename = location.pathname.split('/').pop()
        if (selectedItem == routename) {
            setSelectedItem(routename)
        }
    }, [selectedItem])

    const logout = () => {
        api.logoutUser().then((response) => {
            console.log(response, '//////');

            if (response.data.success) {
                dispatch(loginCheck(false))
                toast.success('successfully logout', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }).catch((err) => {
            console.log(err);

            toast.error(err.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
    }
    const [more, setMore] = useState(false)
    const [messagesCount, setMessagesCount] = useState(0)
    useEffect(() => {
        socket.emit('auth', userData._id)
        socket.on('private_message', (data) => {

            console.log(data, '//////messagingHome//////');
            if (data != '') {
                console.log(data);
                dispatch(increaseMessageCount({ recipientId: data.senderId, message: data }))

            }
        })

        socket.on('incoming_call', handleIncomingCall)
        return (() => {
            socket.off('incoming_call', handleIncomingCall)
        })
        /*         socket.on('incommingCall', handleIncommingCall) */

    }, [userData])

    const handleIncomingCall = useCallback(async (data) => {
        console.log(data);

        dispatch(addVideoCall({ senderId: data.senderId, recipientId: data.recipientId }))
        /*       const ans = await webRTC.getAnswer(data.offer) */
        console.log('incoming call');
        toast.info('video calling....', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        /*         dispatch(addAns(ans)) */

    }, [])

    useEffect(() => {
        setMessagesCount(messageIndication.reduce((total, message) => total + message.count, 0))

    }, [messageIndication])

    useEffect(() => {

        if (videoCall.join) {

            console.log(videoCall, 'videocall');
            navigate('/video_call')
        }



    }, [videoCall.join])




    return (
        <>
            <aside className="max-w-62.5 hidden xl:block ease-nav-brand z-990 fixed overflow-auto no-scrollbar inset-y-0 my-4 ml-4  w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-soft-xl transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
                <div className="h-19.5">
                    <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" sidenav-close></i>
                    <Link to='/' className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"  target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/309/309666.png" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
                        <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Get Chat</span>
                    </Link>
                </div>

                <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

                <div className="items-center block w-auto max-h-screen  grow basis-full">
                    <ul className="flex flex-col pl-0 mb-0">
                        <li onClick={() => setSelectedItem('')} className="mt-0.5 w-full">
                            <Link className={selectedItem == '' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} to="/">
                                <div className={selectedItem == '' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <svg width="12px" height="12px"   viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <title>Dashboard</title>
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-1716.000000, -439.000000)" className={selectedItem == '' ?"fill-white":"fill-black"}  fill-rule="nonzero">
                                                <g transform="translate(1716.000000, 291.000000)">
                                                    <g transform="translate(0.000000, 148.000000)">
                                                        <path
                                                            className="opacity-60"
                                                            d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                                                        ></path>
                                                        <path
                                                            className=""
                                                            d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Home</span>
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full cursor-pointer" onClick={() => { setSearch(!search); setSelectedItem('search') }}>
                            <div className={selectedItem == 'search' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} >
                                <div className={selectedItem == 'search' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <BiSearchAlt className={selectedItem == 'search' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>


                                        <title>Search</title>


                                    </BiSearchAlt>
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Search</span>
                            </div>
                        </li>
                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem('explore')}>
                            <Link className={selectedItem == 'explore' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} to="/explore">
                                <div className={selectedItem == 'explore' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <MdExplore className={selectedItem == 'explore' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Explore</title>
                                    </MdExplore>

                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Explore</span>
                            </Link>
                        </li>
                        {/*   <li className="mt-0.5 w-full">
                            <Link className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" to="/videos">
                                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                    <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <title>Audience</title>
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                                <g transform="translate(1716.000000, 291.000000)">
                                                    <g transform="translate(153.000000, 2.000000)">
                                                        <path className="fill-slate-800 opacity-60" d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"></path>
                                                        <path className="fill-slate-800" d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Videos</span>
                            </Link>
                        </li>
 */}
                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem('messages')}>
                            <Link className={selectedItem == 'messages' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} to="/messages">
                                <div className={selectedItem == 'messages' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 relative' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center  relative justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <AiTwotoneMessage className={selectedItem == 'messages' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Message</title>

                                    </AiTwotoneMessage>
                                    {messagesCount > 0 && <span className="inline-flex absolute  items-center justify-center   ml-2 text-[8px] text-white font-semibold   w-3 h-3 bg-rose-600 rounded-full left-4 top-0">
                                        {messagesCount}
                                    </span>}



                                </div>


                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Messages</span>
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem('notifications')}>
                            <a className={selectedItem == 'notifications' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} onClick={() => setNotifications(!notifications)}>
                                <div className={selectedItem == 'notifications' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <IoMdNotifications className={selectedItem == 'notifications' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Notifications</title>
                                    </IoMdNotifications>


                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Notifications</span>
                            </a>
                        </li>
                        <li className="mt-0.5 w-full cursor-pointer" onClick={() => { setUploader(!uploader); setSelectedItem('create') }}>
                            <div className={selectedItem == 'create' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} >
                                <div className={selectedItem == 'create' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <MdUploadFile className={selectedItem == 'create' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Create</title>
                                    </MdUploadFile>

                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Create</span>
                            </div>
                        </li>

                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem(`${userData.username}`)}>
                            <Link className={selectedItem == `${userData.username}` ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} to={'/' + username}>
                                <div className={selectedItem == `${userData.username}` ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <CgProfile className={selectedItem == `${userData.username}` ? 'fill-white' : 'transition ease-in-out delay-150 hover:translate-y-1  hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Profile</title>
                                    </CgProfile>

                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Profile</span>
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem('more')}>
                            <a onClick={() => setMore(!more)} className={selectedItem == 'more' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} >
                                <div className={selectedItem == 'more' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <CgDetailsMore className={selectedItem == 'more' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>More</title>
                                    </CgDetailsMore>
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">More</span>
                            </a>
                        </li>
                        {more && <div className="w-full">

                            <div className="z-10 ml-auto cursor-pointer  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">

                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">

                                    <li>
                                        <Link to={'/settings'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                                    </li>

                                </ul>
                                <div className="py-2">
                                    <a onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </div>
                            </div>
                        </div>}

                    </ul>
                </div>

            </aside>
            {/* below xl view */}
            <aside className="max-w-62.5 block xl:hidden ease-nav-brand z-990 fixed overflow-auto no-scrollbar inset-y-0 my-4 ml-4  -translate-x-0 flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-soft-xl transition-transform duration-200 left-0  bg-transparent">
                <div className="h-19.5">
                    <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" sidenav-close></i>
                    <Link to='/' className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"  target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/309/309666.png" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
            
                    </Link>
                </div>

                <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

                <div className="items-center block w-auto max-h-screen  grow basis-full">
                    <ul className="flex flex-col pl-0 mb-0">
                        <li onClick={() => setSelectedItem('')} className="mt-0.5 w-full">
                            <Link className={selectedItem == '' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} to="/">
                                <div className={selectedItem == '' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-1716.000000, -439.000000)" className={selectedItem == '' ?"fill-white":"fill-black"} fill-rule="nonzero">
                                                <g transform="translate(1716.000000, 291.000000)">
                                                    <g transform="translate(0.000000, 148.000000)">
                                                        <path
                                                            className="opacity-60"
                                                            d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                                                        ></path>
                                                        <path
                                                            className=""
                                                            d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                               
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full cursor-pointer" onClick={() => { setSearch(!search); setSelectedItem('search') }}>
                            <div className={selectedItem == 'search' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} >
                                <div className={selectedItem == 'search' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <BiSearchAlt className={selectedItem == 'search' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>


                                        <title>Search</title>


                                    </BiSearchAlt>
                                </div>
                               
                            </div>
                        </li>
                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem('explore')}>
                            <Link className={selectedItem == 'explore' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} to="/explore">
                                <div className={selectedItem == 'explore' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <MdExplore className={selectedItem == 'explore' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Explore</title>
                                    </MdExplore>

                                </div>
                               
                            </Link>
                        </li>
                        {/*   <li className="mt-0.5 w-full">
                            <Link className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" to="/videos">
                                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                    <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <title>Audience</title>
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                                <g transform="translate(1716.000000, 291.000000)">
                                                    <g transform="translate(153.000000, 2.000000)">
                                                        <path className="fill-slate-800 opacity-60" d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"></path>
                                                        <path className="fill-slate-800" d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Videos</span>
                            </Link>
                        </li>
 */}
                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem('messages')}>
                            <Link className={selectedItem == 'messages' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} to="/messages">
                                <div className={selectedItem == 'messages' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 relative' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center  relative justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <AiTwotoneMessage className={selectedItem == 'messages' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Message</title>

                                    </AiTwotoneMessage>
                                    {messagesCount > 0 && <span className="inline-flex absolute  items-center justify-center   ml-2 text-[8px] text-white font-semibold   w-3 h-3 bg-rose-600 rounded-full left-4 top-0">
                                        {messagesCount}
                                    </span>}



                                </div>


                               
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem('notifications')}>
                            <a className={selectedItem == 'notifications' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} onClick={() => setNotifications(!notifications)}>
                                <div className={selectedItem == 'notifications' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <IoMdNotifications className={selectedItem == 'notifications' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Notifications</title>
                                    </IoMdNotifications>


                                </div>
                               
                            </a>
                        </li>
                        <li className="mt-0.5 w-full cursor-pointer" onClick={() => { setUploader(!uploader); setSelectedItem('create') }}>
                            <div className={selectedItem == 'create' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} >
                                <div className={selectedItem == 'create' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <MdUploadFile className={selectedItem == 'create' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Create</title>
                                    </MdUploadFile>

                                </div>
                             
                            </div>
                        </li>

                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem(`${userData.username}`)}>
                            <Link className={selectedItem == `${userData.username}` ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} to={'/' + username}>
                                <div className={selectedItem == `${userData.username}` ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <CgProfile className={selectedItem == `${userData.username}` ? 'fill-white' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>Profile</title>
                                    </CgProfile>

                                </div>
                              
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full" onClick={() => setSelectedItem('more')}>
                            <a onClick={() => setMore(!more)} className={selectedItem == 'more' ? 'py-2.7 shadow-soft-xl rounded-lg bg-white text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors' : 'py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors'} >
                                <div className={selectedItem == 'more' ? 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl from-purple-700 to-pink-500  h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5' : 'shadow-soft-2xl mr-2 flex bg-gradient-to-tl hover:from-purple-700 hover:to-pink-500 hover:translate-y-1 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}>
                                    <CgDetailsMore className={selectedItem == 'more' ? 'fill-white ' : 'transition ease-in-out delay-150 hover:translate-y-1 hover:fill-white hover:scale-110 duration-300 '}>
                                        <title>More</title>
                                    </CgDetailsMore>
                                </div>
                              
                            </a>
                        </li>
                        {more && <div className="w-full">

                            <div className="z-10 ml-auto cursor-pointer  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">

                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">

                                    <li>
                                        <Link to={'/settings'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                                    </li>

                                </ul>
                                <div className="py-2">
                                    <a onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </div>
                            </div>
                        </div>}

                    </ul>
                </div>

            </aside>

            {<UploadPost upload={uploader} setUpload={setUploader} />}
            <Search open={search} setOpen={setSearch} username={username} />
            {<Notifications open={notifications} setOpen={setNotifications} />}
        </>
    )
}

export default memo(NavSideBar) 