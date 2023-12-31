import React, { useEffect, useState } from 'react'
import { NavRightSide, NavSideBar } from '../../widgets/layout/user'
import { useDispatch, useSelector } from 'react-redux'
import { HiSquares2X2 } from 'react-icons/hi2'
import api from '../../services/api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FollowList, ViewPost } from '../../Components'
import { addUserData } from '../../redux/userSlice'
import { socket } from '../../services/socketIo'
import { LuLayoutDashboard } from 'react-icons/lu'
import ShimmerProfilePost from '../../widgets/shimmerEffects/ShimmerProfilePost'



const userProfile = () => {
    const userData = useSelector((state: any) => state.user.userData)
    const { username } = useParams()
    const [userDetail, setUserDetail] = useState<any>('')
    const navigate = useNavigate()
    const [postClick, setPostClick] = useState<boolean>(false)
    const [indexPost, setIndexPost] = useState()
    const [likedBy, setLikedBy] = useState(false)
    const [postData, setPostData] = useState([])
    const [following, setFollowing] = useState(false)
    const dispatch = useDispatch()
    const [follows, setFollows] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('')

    useEffect(() => {
        if (userData.username == username) navigate('/' + username)
        api.getProfile({ username }).then((response) => {

            if (response.data.success) {
                setUserDetail(response.data.data)
            }
        }).catch((err) => {
            console.log(err);

        })


    }, [userData, username])
    useEffect(() => {
        setIsLoading(true)
        api.getPost(1, userDetail.username).then((response) => {

            setIsLoading(false)
            if (response.data.success) {
                setPostData(response.data.data)
            }
        }).catch((err) => {
            console.log(err);
        })

        setFollowing(userData.following.some((follow) => follow == userDetail.username))


    }, [userDetail])
    const handlePostView = async (index, likedByUsername) => {
      

      
        await setLikedBy(likedByUsername.some((username) => username == userData.username))




        setIndexPost(index)
        setPostClick(true)
 
    }



    const follow = () => {

        api.putFollow({ followUserName: userDetail?.username, user: userData.username }).then((response) => {
            console.log(response);

            if (response.data.success) {
                dispatch(addUserData(response.data.data))
                setFollowing(true)
                socket.emit('following', { sender_username: userData.username, senderId: userData._id, recipient_username: userDetail.username, recipientId: userDetail._id, message: 'started following you.' })
            }

        }).catch((err) => {
            console.log(err);

        })
    }

    const unfollow = () => {
        api.deleteFollow({ followUserName: userDetail?.username, user: userData.username }).then((response) => {
            console.log(response);

            if (response.data.success) {
                dispatch(addUserData(response.data.data))
                setFollowing(false)
            }

        }).catch((err) => {
            console.log(err);

        })
    }

    const handleFollow = (type) => {
        if (type == 'following') {
            setType(type)

            setFollows(true)
        } else {
            setType(type)
            setFollows(true)
        }

    }
    return (
        <>


            <main className="ease-soft-in-out xl:ml-68.5  relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
                <div className='w-full mt-7' >
                    {userDetail ? (<div className='container'>
                        <header className="flex flex-wrap items-center p-4 md:py-8">

                            <div className="md:w-3/12 md:ml-16">

                                <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
             border-2 border-pink-600 p-1" src={userDetail.profile_pic ?? 'https://www.bytewebster.com/img/logo.png'} alt="profile" />
                            </div>


                            <div className="w-8/12 md:w-7/12 ml-4">
                                <div className="md:flex md:flex-wrap md:items-center mb-4">
                                    <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                                        {userDetail.username}
                                    </h2>


                                    <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                       relative mr-6  text-xl transform -translate-y-2" aria-hidden="true">
                                        <i className="fas fa-check text-white text-xs absolute inset-x-0
                       ml-1 mt-px"></i>
                                    </span>


                                    {!following ? (<button onClick={() => follow()} className="bg-blue-500 px-2 py-1 
                text-white font-semibold text-sm rounded  text-center 
                sm:inline-block block">follow</button>) : (<button onClick={() => unfollow()} className="bg-slate-100 px-2 py-1 
                text-black font-semibold text-sm rounded  text-center 
                sm:inline-block block">unfollow</button>)}
                                    {following && <button className="bg-slate-100 ml-4 px-2 py-1 
                text-black font-semibold text-sm rounded  text-center 
                sm:inline-block block"><Link to={`/messages?userId=${userDetail._id}`}>message</Link></button>}
                                </div>


                                <ul className="hidden md:flex space-x-8 mb-4">
                                    <li>
                                        <span className="font-semibold">{userDetail.posts?.length} </span>
                                        posts
                                    </li>

                                    <li>
                                        <span className="font-semibold">{userDetail.followers?.length} </span>
                                        <a className='cursor-pointer' onClick={() => handleFollow('followers')}>followers</a>
                                    </li>
                                    <li>
                                        <span className="font-semibold">{userDetail.following?.length} </span>
                                        <a className='cursor-pointer' onClick={() => handleFollow('following')}>following</a>
                                    </li>
                                </ul>


                                <div className="hidden md:block">
                                    <h1 className="font-semibold">{userDetail.full_name}</h1>
                                    {/*  <span className="bioclass">Internet company</span> */}
                                    <p>{userDetail.bio}</p>
                                    {/*  <span><strong>www.bytewebster.com</strong></span> */}
                                </div>

                            </div>

                            <div className="md:hidden text-sm my-2">
                                <h1 className="font-semibold">{userDetail.full_name}</h1>
                                {/*   <span className="bioclass">Internet company</span> */}
                                <p>{userDetail.bio}</p>
                                {/*    <span><strong>www.bytewebster.com</strong></span> */}
                            </div>

                        </header>
                        {follows && <FollowList follow={follows} setFollow={setFollows} userId={userDetail._id} type={type} user={false} />}
                        <div className="px-px md:px-3">


                            <ul className="flex md:hidden justify-around space-x-8 border-t 
        text-center p-2 text-gray-600 leading-snug text-sm">
                                <li>
                                    <span className="font-semibold text-gray-800 block">6</span>
                                    posts
                                </li>

                                <li>
                                    <span className="font-semibold text-gray-800 block">50.5k</span>
                                    followers
                                </li>
                                <li>
                                    <span className="font-semibold text-gray-800 block">10</span>
                                    following
                                </li>
                            </ul>
                            <br />
                            <br />

                            <ul className="flex items-center justify-around md:justify-center space-x-12  
            uppercase tracking-widest font-semibold text-xs text-gray-600
            border-t">

                                <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                                    <a className=" p-3 flex " >
                                        <LuLayoutDashboard className='text-xl mr-2 h-full w-fit md:text-xs' />
                                        <span className="hidden md:inline">post</span>
                                    </a>
                                </li>
                                {/*   <li>
                                    <a className="inline-block p-3" href="#">
                                        <i className="far fa-square text-xl md:text-xs"></i>
                                        <span className="hidden md:inline">videos</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="inline-block p-3" href="#">
                                        <i className="fas fa-user border border-gray-500
                     px-1 pt-1 rounded text-xl md:text-xs"></i>
                                        <span className="hidden md:inline">tagged</span>
                                    </a>
                                </li> */}
                            </ul>

                            <div className="flex flex-wrap -mx-px md:-mx-3">

                                {isLoading ? (<>
                                    {Array.from({ length: 6 }).map((_, index) => (

                                        <ShimmerProfilePost />

                                    ))}
                                </>) : postData?.map((post, index) => {
                                    return (
                                        <div key={index} className="w-1/3 p-px md:px-3">

                                            <a onClick={() => handlePostView(index, post.likedBy)}>
                                                <article className="post bg-gray-100 text-white relative pb-full md:mb-6">

                                                    <img className="w-full h-full absolute left-0 top-0 object-cover" src={post.post_url} alt="image" />

                                                    <i className="fas fa-square absolute right-0 top-0 m-1"></i>

                                                    <div className="overlay hidden hover:block bg-gray-800 bg-opacity-25 w-full h-full absolute 
                        left-0 top-0 ">
                                                        <div className="flex justify-center items-center 
                            space-x-4 h-full">
                                                            <span className="p-2">
                                                                <i className="fas fa-heart"></i>
                                                                412K
                                                            </span>

                                                            <span className="p-2">
                                                                <i className="fas fa-comment"></i>
                                                                2,909
                                                            </span>
                                                        </div>
                                                    </div>

                                                </article>
                                            </a>
                                            {postClick && indexPost == index && (<ViewPost post={post} postClick={postClick} username={userData.username} setPostClick={setPostClick} likedBy={likedBy} />)}
                                        </div>

                                    )
                                })
                                }


                            </div>
                        </div>

                    </div>) : (<div >
                        <h1 className='flex justify-center font-bold text-4xl mt-7'>Sorry, this page isn't available.</h1>
                        <span className='flex justify-center mt-12'>The link you followed may be broken, or the page may have been removed. <Link to='/' className='text-cyan-600'>Go back to GetChat.</Link></span>
                    </div>)}

                </div>

            </main>


        </>
    )
}

export default userProfile