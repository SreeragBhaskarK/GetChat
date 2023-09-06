import React from 'react'
import { NavSideBar } from '.'



const User = ({ Components }) => {
    return (
        <>
            <NavSideBar />
            <main className="ease-soft-in-out xl:ml-68.5 xl:mr-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
                <Components />
            </main >
        </>
    )
}

export default User