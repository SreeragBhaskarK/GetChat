import React, { useState } from 'react'
import { PostDetail } from '../widgets/cards'



export const ViewPost = ({ post, postClick, setPostClick,username,likedBy}) => {
    return (
        <>

            <div className="fixed  top-0 left-0 right-0 z-50   p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full   h-full">
                    <div className="relative   rounded-lg  h-full w-full ">
                        <div className="flex items-start justify-between  p-4  rounded-t dark:border-gray-600">
                           
                            <button
                                type="button"
                                onClick={()=>setPostClick(!postClick)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 flex justify-center   dark:bg-gray-700  ">
                            <div className='w-fit border border-slate-200 '>
                                <img className='max-w-lg h-[80vh] ' src={post.post_url} alt="" />
                            </div>
                            <div className='max-w-lg  min-w-[480px] h-[80vh]  '>
                                <PostDetail post={post} username={username}  likedBy={likedBy} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ViewPost