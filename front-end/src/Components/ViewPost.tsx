import React, { useState } from 'react'
import { PostDetail } from '../widgets/cards'



export const ViewPost = ({ postClick, setPostClick }) => {
    return (
        <>

            {postClick && <div className="fixed  top-0 left-0 right-0 z-50   p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
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
                            <div className='w-fit '>
                                <img className='w-full h-full ' src="data:image/jpeg;base64,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" alt="" />
                            </div>
                            <div className='max-w-lg  min-w-[480px] h-screen  '>
                                <PostDetail/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ViewPost