import { Link } from "react-router-dom";
import api from "../services/api"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../redux/userSlice";
import { socket } from "../services/socketIo";



export const FollowList = ({ setFollow, follow, userId, type, user }) => {
    const [followData, setFollowData] = useState([])
  
    const dispatch = useDispatch()
    const userData = useSelector((state: any) => state.user.userData)
    useEffect(() => {
        api.getFollowData({ userId, type }).then((response) => {
           

            if (response.data.success) {
                setFollowData(response.data.data)
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [type])

    const following = (username, userId) => {

        api.putFollow({ followUserName: username, user: userData.username }).then((response) => {


            if (response.data.success) {
                dispatch(addUserData(response.data.data))
                socket.emit('following', { sender_username: userData.username, senderId: userData._id, recipient_username: username, recipientId: userId, message: 'started following you.' })
            }

        }).catch((err) => {
            console.log(err);

        })
    }

    const unfollow = (username) => {
  
        api.deleteFollow({ followUserName: username, user: userData.username }).then((response) => {
  

            if (response.data.success) {
                setFollowData((prevFollow)=>prevFollow.filter((user)=>user.username!=username))
                dispatch(addUserData(response.data.data))

            }

        }).catch((err) => {
            console.log(err);

        })
    }

    const removeFollow = (followerUser) => {
        api.removeFollow({ followersUsername: followerUser, followingUsername: userData.username }).then((response) => {
  
            if (response.data.success) {
                setFollowData((prevFollow)=>prevFollow.filter((user)=>user.username!=followerUser))
                dispatch(addUserData(response.data.data))
            }

        }).catch((err) => {
            console.log(err);

        })
    }

    return (
        <>
            <div className="relative w-full mx-auto max-w-md max-h-full">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={() => setFollow(!follow)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                            {type}
                        </h3>
                    </div>

                    <div className="p-6">
                        <ul className="my-4 space-y-3">
                            {followData.map((follow) => {
                                const result = follow.followers.some((user) => user == userData.username)
                                return (

                                    <li className="flex justify-between">
                                        <Link to={`/${follow.username}`} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                            <img className="w-4" src={follow.profile_pic} />
                                            <span className="flex-1 ml-3 whitespace-nowrap">{follow.username}</span>
                                        </Link>
                                        <div>
                                            {type == 'following' || user == false ? (result ? (<button onClick={() => unfollow(follow.username)} className="inline-flex  items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">following</button>) : (follow.username != userData.username &&<button onClick={() => following(follow.username, follow._id)} className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-white bg-blue-500 rounded dark:bg-gray-700 dark:text-gray-400">follow</button>)) : (<button onClick={() => removeFollow(follow.username)} className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">remove</button>)}
                                        </div>

                                    </li>
                                )
                            })

                            }
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowList