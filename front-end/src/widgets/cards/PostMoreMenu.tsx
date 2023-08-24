import React from 'react'
import api from '../../services/api'


export const PostMoreMenu = ({post,setMore}) => {
    const deleteHandle = ()=>{
        api
    }
    const editHandle = ()=>{

    }
    const cancelHandle = ()=>{

    }
    return (
        <div className='  absolute  flex'> 
            <div className='w-[400px] gap-2 max-h-[calc(100%-40px)] border rounded-md b bg-white'>
                <div className='flex-col flex rounded-lg'>
                <button className='border min-h-[48px] text-red-600 font-mono font-extrabold cursor-pointer'>Delete</button>
                <button className='border min-h-[48px] cursor-pointer'>Edit</button>
                <button onClick={()=>setMore(false)} className='border min-h-[48px] cursor-pointer'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PostMoreMenu