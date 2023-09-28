import { Link } from "react-router-dom"
import { addUserData, loginCheck } from "../../../redux/userSlice"
import { useEffect, useState } from "react"
import api from "../../../services/api"
import { useDispatch, useSelector } from "react-redux"
import { socket } from "../../../services/socketIo"
import { ShimmerSearch } from "../../shimmerEffects"
export const NavRightSide = () => {
    const [suggention, setSuggention] = useState<[]>([])
    const userData = useSelector((state: any) => state.user.userData)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setIsLoading(true)
        api.getSuggestion(userData.username).then((response) => {
            setIsLoading(false)
            if (response.data.success) {
                console.log(response, 'suggention');
                setSuggention(response.data.data)
            }

        }).catch((err) => {
            console.log(err, 'errr');

        })
    }, [userData])

    const follow = (username, userId) => {

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
        <>
            <aside className="max-w-62.5 ease-nav-brand  mr-8 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto no-scrollbar rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:right-0 xl:translate-x-0 xl:bg-transparent">
                <div className=" mt-20 mb-5">
                    <span className="ml-1 bottom-0 font-semibold transition-all duration-200 ease-nav-brand">Suggested for you </span>
                </div>

                <hr className="h-px mt-0 bg-transparent bg-gradient-to-r  mb-5 from-transparent via-black/40 to-transparent" />

                <div className="items-center block w-auto max-h-screen grow basis-full">
                    <ul className="flex flex-col pl-0 mb-0">
                        {isLoading ? (
                            <>
                                {Array.from({ length: 20 }).map((_, index) => (

                                    <ShimmerSearch />

                                ))}


                            </>) : (
                            suggention.map((user: any, index) => {
                                const following = user.followers.some((userfollow) => userfollow == userData.username)
                                return (
                                    <li key={index} className='mb-3 flex ' ><Link  to={`${user.username}`}>
                                        <div className='flex flex-row items-center gap-4'>
                                            <img src={user.profile_pic}
                                                className='h-10 w-10 rounded-full object-cover' />
                                            <span className="w-28 overflow-hidden text-ellipsis">{user.username}</span>

                                        </div> </Link>
                                        <div className='gap-4 my-auto ml-auto'>
                                            {following ? <button onClick={() => unfollow(user.username)} className="bg-slate-100 px-2 py-1  text-black font-semibold text-sm rounded  text-center sm:inline-block block">following</button> : <button onClick={() => follow(user.username, user._id)} className="bg-blue-500 px-2 py-1  text-white font-semibold text-sm rounded  text-center sm:inline-block block">follow</button>}
                                        </div></li>
                                )
                            }))}


                    </ul>
                </div>


            </aside>


        </>
    )
}

export default NavRightSide