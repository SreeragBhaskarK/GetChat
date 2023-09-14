import React from 'react'
import routesAdmin from '../../../services/routesAdmin'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'



export const Admin = () => {
    const isLoggedInAdmin = useSelector((state: any) => state.admin.isLoggedInAdmin)
    return (
        <>
            <Routes>
               

            </Routes>
        </>
    )
}

export default Admin