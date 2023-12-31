import { useSelector } from "react-redux"
import api from "../../services/api"
import { AdsCard, PostCards } from "../../widgets/cards"
import { NavRightSide, NavSideBar, NavTopSide } from "../../widgets/layout/user"
import { useEffect, useState, memo, useCallback } from 'react'
import { toast } from 'react-toastify'

import { ShimmerPosts } from "../../widgets/shimmerEffects"

export const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const userData = useSelector((state: any) => state.user.userData)

    let page = 0
    useEffect(() => {

        loadPost()
        setLoading(true);
    }, [userData])
    const loadPost = useCallback(async () => {
        try {
      

            if (page === 0) return page = 1
            if (!hasMore || loading) return;

            const formData = {
                page,
                username: userData.following,
                type: 'home'
            }
            const response = await api.getPosts(formData)

            if (response.data.success) {
                const newPosts = response.data.data;

                setLoading(false);
                if (newPosts.length === 0) {
                    setHasMore(false);
                } else {
                    const ads = await api.getAdvertisingUser('homePage', page)
                  

                    if (ads.data.success && ads.data.data.length > 0) {
                        setPosts((prePost) => [...prePost, ...newPosts, ...ads.data.data]);
                        page += 1
                     

                    } else {
                        setPosts((prePost) => [...prePost, ...newPosts]);
                        page += 1
                      
                    }

                }
            }
        }
        catch (err: any) {
            if (err.response) {

                toast.error(err.response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('server error', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        finally {
            /* setLoading(false); */
        };

    }, [])
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            loadPost();
        }
    };

    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore]);


    return (
        <>
    
            <main className="ease-soft-in-out ml-40  xl:ml-[17rem] xl:mr-[17rem] relative h-full max-h-screen overflow-auto no-scrollbar rounded-xl min-h-screen transition-all duration-200">
                <div className="w-[calc(100% - 250px)]] w-full px-6  z-10  py-6 mx-auto">
                    <div className="flex justify-around flex-wrap -mx-3">
                        <NavTopSide userData={userData} />
                    </div>
                </div>
                <div className="mx-auto flex flex-col justify-center max-w-lg pb-12">
                    <div className="text-center text-2xl font-bold my-12 text-black">
                        Posts

                    </div>
                    {loading ? (
                        <>
                            <ShimmerPosts />
                            <ShimmerPosts />
                            <ShimmerPosts />
                            <ShimmerPosts />
                            <ShimmerPosts />
                        </>) :
                        (posts.map((post, index) => {
                            return !post.placed_area ? (
                                <PostCards key={index} username={userData.username} post={post} />
                            ) : (
                                <>
                                    <AdsCard ads={post} />
                                </>
                            )
                        }))}
                </div>
            </main >
            <NavRightSide />
        </>
    )
}

export default memo(Home) 