import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'



export const Processing = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center absolute">

            <InfinitySpin
                width='200'
                color="#4fa94d"
            />
        </div>
    )
}

export default Processing