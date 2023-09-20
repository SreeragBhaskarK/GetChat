import React from 'react'



export const ShimmerMessage = () => {
    return (
        <>
            <div
                className='flex items-center animate-pulse  border rounded-xl px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer'>
                <div className="relative flex items-center p-3  border-gray-300">
                    <div className="object-cover w-10 h-10 bg-gray-200 rounded-full"
                    />
                    <span className="absolute w-3 h-3 bg-gray-600 rounded-full left-10 top-3">
                    </span>
                </div>
                <div className="w-full pb-2">
                    <div className="flex justify-between w-full">
                        <div className="block bg ml-2 w-32 h-5 rounded-xl bg-gray-200 font-semibold text-gray-600" />
                        <div className="block ml-2 text-sm w-12 rounded-xl h-5 bg-gray-200 text-gray-600" />
                    </div>

                    <div className="block ml-2 mt-2 rounded-xl h-5 w-20 bg-gray-200 text-sm text-gray-600" />


                </div>
            </div>
        </>
    )
}

export default ShimmerMessage