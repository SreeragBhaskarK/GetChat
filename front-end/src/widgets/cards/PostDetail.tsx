import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { FiMoreHorizontal, FiSend } from 'react-icons/fi'
import { VscComment } from 'react-icons/vsc'



export const PostDetail = () => {
    return (
        <div className='flex flex-col gap-2 h-full bg-white rounded-xl border border-slate-200'>
            <div className='flex flex-row justify-between items-center mt-2 mx-4  '>
                <div className='flex flex-row items-center gap-4'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'
                        className='h-10 w-10 rounded-full object-cover' />
                    <span>Username</span>
                </div>
                <div>
                    <FiMoreHorizontal className='w-6 h-6' />
                </div>
            </div>

            <div className='border'>
            </div>
         
            <div className='m-5'>
                <div className='flex w-full mt-3 flex-row items-center gap-4'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'
                        className='h-10 w-10 rounded-full object-cover' />
                    <h2>Username</h2>
                    <p >kdfkdjfkdjfkkjkjdksjdksjkdjskdjksjdksjdksjdksjdksjkdsjkdjkssjkdjkjfkj</p>
                </div>
                <div className='flex w-full mt-3 flex-row items-center gap-4'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'
                        className='h-10 w-10 rounded-full object-cover' />
                    <h2>Username</h2>
                    <p >kdfkdjfkdjfkkjkjdksjdksjkdjskdjksjdksjdksjdksjdksjkdsjkdjkssjkdjkjfkj</p>
                </div>
            </div>
            <div className='mt-auto'>


                <div className='flex my-2 mb-4 mx-4 flex-row justify-between'>
                    <div className='flex flex-row gap-4 items-center'>
                        <AiOutlineHeart className='w-8 h-8' />
                        <VscComment className='w-8 h-8' />
                        <FiSend className='w-7 h-7' />
                    </div>
                    <BsBookmark className='w-6 h-6' />
                </div>
                <div className='mb-4 mx-4'>
                    <div className='flex flex-row gap-4 items-center mb-2'>
                        <img className='w-6 h-6 rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s' />
                        <p>Like by <strong>Username</strong>and <strong>other 1234 </strong> </p>
                    </div>
                    <p>
                        <strong>Username</strong>Lorem ipsumdkfkdfdkfkdf/
                    </p>
                    <span className='text-slate-500 text-sm'>Show all the 164 comments</span>
                    <p className='mt-2 text-slate-600 text-xs uppercase'>12 Hours Ago</p>
                </div>
            </div>
            <div className='w-full flex mb-2'>
                <input className='w-full' type="text" placeholder='Add a commit...' />
                <button className='text-blue-400'>Post</button>
            </div>
        </div>
    )
}

export default PostDetail