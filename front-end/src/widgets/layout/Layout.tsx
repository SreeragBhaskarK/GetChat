import React, { useState,useEffect,memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import routesAdmin from '../../services/routesAdmin'
import routes from '../../services/routes'

const Profile = React.lazy(() => import('../../pages/Users/Profile'))

export const Layout = () => {
    const isLoggedInAdmin = useSelector((state: any) => state.admin.isLoggedInAdmin)
    const username = useSelector((state: any) => state.user.userData.username)
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)
    


    return (
        <>
            

            <Routes>
               

                <Route path='*' element='error' />
                {/* User Route */}
                {routes.map(({ path, element, type }, index) => {
                    return type == 'private' ? (
                        <Route path={path} key={index} element={isLoggedIn ? element : <Navigate to='/login' />} />
                    ) : (<Route path={path} key={index} element={isLoggedIn ? <Navigate to='/' /> : element} />)
                })}
                <Route path={`/${username}`} element={isLoggedIn ? <Profile /> : <Navigate to='/login' />} />


                {routesAdmin.map(({ path, element, type }, index) => {
                    return type == 'private' ? (
                        <Route path={path} key={index} element={isLoggedInAdmin ? element : <Navigate to='/admin/login' />} />
                    ) : (<Route path={path} key={index} element={isLoggedInAdmin ? <Navigate to='/admin' /> : element} />)
                })}
            </Routes>
        </>
    )
}

export default memo(Layout)