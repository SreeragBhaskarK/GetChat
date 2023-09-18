import React from 'react'



export const ShimmerNotificationFollow = () => {
    return (
        <>
            <div className='flex animate-pulse flex-row items-center overflow-hidden m-4 '>
                <div className=' gap-4'>
                    <div  className='h-10 w-10 rounded-full bg-slate-200 object-cover' />
                </div>
                <div className='gap-4 ml-2 flex h-full text-ellipsis'>
                    <div className='w-16 h-5 mt-auto bg-slate-200'/>
                    <div className='w-28 h-5 mt-auto bg-slate-200'/>
                </div>
                <div className='gap-4 ml-auto'>
                    <div className='w-20 h-6  bg-slate-200'/>
                </div>

            </div>
        </>
    )
}

export default ShimmerNotificationFollow