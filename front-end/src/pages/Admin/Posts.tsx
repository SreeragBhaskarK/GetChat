import React, { useEffect, useState } from 'react'
import { NavSideBar, NavTopBar } from '../../widgets/layout/admin'
import api from '../../services/api'
import { DeleteModal } from '../../Components'



const Posts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        api.getPostsAdmin().then((response) => {
            console.log(response);

            if (response.data.success) {
                setPosts(response.data.data)
            }
        })
    }, [])

    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [deleteIndex, setDeleteIndex] = useState()
    const handleDelete = (index) => {
        setDeleteIndex(index)
        setDeleteModal(!deleteModal)
    }

    return (
        <>
           <NavSideBar/>
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
                <NavTopBar navLocation='Posts' />
                <div className="w-full px-6 py-6 mx-auto">
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-full max-w-full px-3">
                            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">

                                <div className="flex-auto px-0 pt-0 pb-2">
                                    <div className="p-0 overflow-x-auto">
                                        <table className="items-center justify-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                            <thead className="align-bottom">
                                                <tr>
                                                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Post</th>
                                                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Post Id</th>
                                                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Likes</th>
                                                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Reports Data</th>
                                                    <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Reports Username</th>
                                                    <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Reports Reason</th>
                                                    <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Actions</th>
                                                    <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap"></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {posts.map((post, index) => {
                                                    return (


                                                        <tr>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2">
                                                                    <div>
                                                                        <img src={post.post.post_url} className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 rounded-full ease-soft-in-out h-9 w-9" alt="spotify" />
                                                                    </div>
                                                                    <div className="my-auto">
                                                                        <h6 className="mb-0 text-sm leading-normal">{post.post.caption}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <p className="mb-0 text-sm font-semibold leading-normal">#{post.post.id}</p>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <p className="mb-0 text-sm font-semibold leading-normal">{post.post.likes}</p>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <span className="text-xs font-semibold leading-tight">{new Date(post.createdAt).toLocaleString()}</span>
                                                            </td>
                                                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                {/* <div className="flex items-center justify-center">
                                                                    <span className="mr-2 text-xs font-semibold leading-tight">60%</span>
                                                                    <div>
                                                                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                                            <div className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5 w-3/5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                                <span className="text-xs font-semibold leading-tight">{post.post.username}</span>
                                                            </td>

                                                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">

                                                                <span className="text-xs font-semibold leading-tight">{post.type}</span>
                                                            </td>

                                                            <td className="p-2 align-middle bg-transparent border-b   whitespace-nowrap shadow-transparent">
                                                                <div className='flex justify-center'>
                                                                    {post.status == 'pending' ?
                                                                        (<a onClick={() => handleDelete(index)} className="text-xs mx-2 cursor-pointer font-semibold leading-tight text-red-400"> Delete </a>):(<a  className="text-xs mx-2 font-semibold leading-tight text-green-400"> solved </a>)
                                                                    }
                                                                </div>
                                                                {deleteModal && deleteIndex == index && (<DeleteModal setItems={setPosts} items={index}  deleteItem={post.post} deleteModal={deleteModal} setDeleteModal={setDeleteModal} type='post'  />)}
                                                            </td>
                                                          {/*   <td className="p-2 align-middle bg-transparent border-b  whitespace-nowrap shadow-transparent">
                                                                <button type="button" className="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500">View Post</button>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                })
                                                }
                                                {/*   <tr>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <div className="flex px-2">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-invision.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 rounded-full ease-soft-in-out h-9 w-9" alt="invision" />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm leading-normal">Invision</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <p className="mb-0 text-sm font-semibold leading-normal">$5,000</p>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <span className="text-xs font-semibold leading-tight">done</span>
                                                    </td>
                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <div className="flex items-center justify-center">
                                                            <span className="mr-2 text-xs font-semibold leading-tight">100%</span>
                                                            <div>
                                                                <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                                    <div className="duration-600 ease-soft bg-gradient-to-tl from-green-600 to-lime-400 -mt-0.38 -ml-px flex h-1.5 w-full flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <button className="inline-block px-6 py-3 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-pro ease-soft-in bg-150 tracking-tight-soft bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                            <i className="text-xs leading-tight fa fa-ellipsis-v"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <div className="flex px-2">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-jira.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 rounded-full ease-soft-in-out h-9 w-9" alt="jira" />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm leading-normal">Jira</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <p className="mb-0 text-sm font-semibold leading-normal">$3,400</p>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <span className="text-xs font-semibold leading-tight">canceled</span>
                                                    </td>
                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <div className="flex items-center justify-center">
                                                            <span className="mr-2 text-xs font-semibold leading-tight">30%</span>
                                                            <div>
                                                                <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                                    <div className="duration-600 ease-soft bg-gradient-to-tl from-red-600 to-rose-400 -mt-0.38 w-3/10 -ml-px flex h-1.5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="30"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <button className="inline-block px-6 py-3 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-pro ease-soft-in bg-150 tracking-tight-soft bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                            <i className="text-xs leading-tight fa fa-ellipsis-v"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <div className="flex px-2">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-slack.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 rounded-full ease-soft-in-out h-9 w-9" alt="slack" />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm leading-normal">Slack</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <p className="mb-0 text-sm font-semibold leading-normal">$1,000</p>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <span className="text-xs font-semibold leading-tight">canceled</span>
                                                    </td>
                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <div className="flex items-center justify-center">
                                                            <span className="mr-2 text-xs font-semibold leading-tight">0%</span>
                                                            <div>
                                                                <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                                    <div className="duration-600 ease-soft bg-gradient-to-tl from-green-600 to-lime-400 -mt-0.38 -ml-px flex h-1.5 w-0 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="0"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <button className="inline-block px-6 py-3 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-pro ease-soft-in bg-150 tracking-tight-soft bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                            <i className="text-xs leading-tight fa fa-ellipsis-v"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <div className="flex px-2">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-webdev.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 rounded-full ease-soft-in-out h-9 w-9" alt="webdev" />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm leading-normal">Webdev</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <p className="mb-0 text-sm font-semibold leading-normal">$14,000</p>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <span className="text-xs font-semibold leading-tight">working</span>
                                                    </td>
                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <div className="flex items-center justify-center">
                                                            <span className="mr-2 text-xs font-semibold leading-tight">80%</span>
                                                            <div>
                                                                <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                                    <div className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5 w-4/5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="80"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                        <button className="inline-block px-6 py-3 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-pro ease-soft-in bg-150 tracking-tight-soft bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                            <i className="text-xs leading-tight fa fa-ellipsis-v"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                        <div className="flex px-2">
                                                            <div>
                                                                <img src="../assets/img/small-logos/logo-xd.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 rounded-full ease-soft-in-out h-9 w-9" alt="xd" />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm leading-normal">Adobe XD</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                        <p className="mb-0 text-sm font-semibold leading-normal">$2,300</p>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                        <span className="text-xs font-semibold leading-tight">done</span>
                                                    </td>
                                                    <td className="p-2 text-center align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                        <div className="flex items-center justify-center">
                                                            <span className="mr-2 text-xs font-semibold leading-tight">100%</span>
                                                            <div>
                                                                <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                                    <div className="duration-600 ease-soft bg-gradient-to-tl from-green-600 to-lime-400 -mt-0.38 -ml-px flex h-1.5 w-full flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                        <button className="inline-block px-6 py-3 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-pro ease-soft-in bg-150 tracking-tight-soft bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                            <i className="text-xs leading-tight fa fa-ellipsis-v"></i>
                                                        </button>
                                                    </td>
                                                </tr> */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Posts