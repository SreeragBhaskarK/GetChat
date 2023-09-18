import React from 'react'



export const ShimmerSearch = () => {
    return (
        <>
            <li className='mb-3' > <div className='flex animate-pulse flex-row items-center gap-4'>
                <div className='h-10 w-10 rounded-full bg-slate-200 object-cover' />
                <div className='w-32 h-4 bg-slate-200' />
            </div></li>
        </>
    )
}

export default ShimmerSearch