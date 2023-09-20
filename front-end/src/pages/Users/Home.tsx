import { useSelector } from "react-redux"
import api from "../../services/api"
import { PostCards } from "../../widgets/cards"
import { NavRightSide, NavSideBar } from "../../widgets/layout/user"
import { useEffect, useState, memo, useCallback } from 'react'
import { toast } from 'react-toastify'
import { AdsCard } from '../../widgets/cards/AdsCard'
import { ShimmerPosts } from "../../widgets/shimmerEffects"
export const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const userData = useSelector((state: any) => state.user.userData)

    let page = 0
    useEffect(() => {
        console.log(userData, '////////');
        loadPost()
        setLoading(true);
    }, [userData])
    const loadPost = useCallback(async () => {
        try {
            console.log(page);

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
                    console.log(ads, 'aaaaaaadasddfdfdf');

                    if (ads.data.success && ads.data.data.length > 0) {
                        setPosts((prePost) => [...prePost, ...newPosts, ...ads.data.data]);
                        page += 1
                        console.log(page, '//////////////');

                    } else {
                        setPosts((prePost) => [...prePost, ...newPosts]);
                        page += 1
                        console.log(page, '//////////////');

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
            <NavSideBar />
            <main className="ease-soft-in-out xl:ml-68.5 xl:mr-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
                <div className="w-full px-6 py-6 mx-auto">
                    <div className="flex justify-around flex-wrap -mx-3">

                        <div className="w-full max-w-full px-3 mb-6  sm:flex-none xl:mb-0 ">
                            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="flex-auto p-4 overflow-x-auto no-scrollbar  scroll">
                                    <div className="flex   flex-row -mx-3">

                                        <div className="px-3  ">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-world text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>

                                        <div className="px-3  ">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-world text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>
                                        <div className="px-3  ">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-world text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>
                                        <div className="px-3  ">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-world text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>
                                        <div className="px-3  ">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                                <i className="ni leading-none ni-world text-lg relative top-3.5 text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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