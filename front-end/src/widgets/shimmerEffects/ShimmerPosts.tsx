import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsBookmark, BsSend } from 'react-icons/bs'
import { FiMoreHorizontal, FiSend } from 'react-icons/fi'
import { VscComment } from 'react-icons/vsc'

export const ShimmerPosts = () => {
    return (
        <>
            <div className='flex animate-pulse flex-col mb-4 gap-2 bg-white rounded-xl border border-slate-200'>
                <div className='flex flex-row justify-between items-center mt-2 mx-4'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='h-10 w-10 rounded-full bg-slate-200 object-cover' />
                        <div className='bg-slate-200 h-2 w-30 rounded' />
                    </div>
                    <FiMoreHorizontal  className='w-6 h-6 fill-slate-200' />

                </div>
                <div className='bg-slate-200 w-full h-[510px]' />

                <div className='flex my-2 mb-4 mx-4 flex-row justify-between'>
                    <div className='flex flex-row gap-4 items-center'>
                        <AiOutlineHeart className='w-8 h-8 fill-slate-200' />
                        <VscComment className='w-8 h-8 fill-slate-200 ' />
                        <BsSend className='w-7 h-7 fill-slate-200' />
                    </div>
                    <BsBookmark className='w-6 h-6 fill-slate-200' />
                </div>
                <div className='mb-4 mx-4'>
                    <div className='flex flex-row gap-4 items-center mb-2'>
                        <div className='w-6 h-6 rounded-full bg-slate-200' />
                        <div className='w-44 bg-slate-200 h-4 '/>
                    </div>
                    <div className='w-16 h-4 bg-slate-200'/>
                    {/* <span className='text-slate-500 text-sm'>Show all the 164 comments</span> */}

                </div>

            </div>
        </>
    )
}

export default ShimmerPosts