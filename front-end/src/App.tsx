import './App.css'
import { Navigate, Route, Routes } from "react-router-dom"
import React, { Suspense } from "react";
import { useSelector } from 'react-redux';
import routes from './services/routes';
import routesAdmin from './services/routesAdmin';
const Login = React.lazy(() => import('./pages/Users/Login'))
const Signup = React.lazy(() => import('./pages/Users/Signup'))
const Verification = React.lazy(() => import('./pages/Users/Verification'))
const OtpVerification = React.lazy(() => import('./pages/Users/OtpVerification'))
const ForgotPassword = React.lazy(() => import('./pages/Users/ForgotPassword'))
const LoginAdmin = React.lazy(() => import('./pages/Admin/LoginAdmin'))
const Profile = React.lazy(()=> import('./pages/Users/Profile'))
function App() {
  
  const username = useSelector((state:any)=>state.user.userData.username)
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)
  const isLoggedInAdmin = useSelector((state: any) => state.admin.isLoggedInAdmin)
  return (
    <Suspense >
      <Routes>
        <Route path='*' element='error' />
        {/* User Route */}
        {routes.map(({ path, element },index) => {
          return (
            <Route path={path} key={index} element={isLoggedIn ? element : <Navigate to='/login' />} />
          )
        })}
        <Route path='/login' element={isLoggedIn ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={isLoggedIn ? <Navigate to='/' /> : <Signup />} />

        <Route path='/verification' element={isLoggedIn ? <Navigate to='/' /> : <Verification />} />
        <Route path='/otp-verification' element={isLoggedIn ? <Navigate to='/' /> : <OtpVerification />} />
        <Route path='/forgot-password' element={isLoggedIn ? <Navigate to='/' /> : <ForgotPassword />} />
        <Route path={`/${username}`} element={isLoggedIn ? <Profile/> :<Navigate to='/login'/>} />

        {/* Admin Route */}
        {routesAdmin.map(({ path, element },index) => {
          return (
            <Route path={path} key={index} element={isLoggedInAdmin ? element : <Navigate to='/admin/login' />} />
          )
        })}
        <Route path='/admin/login' element={isLoggedInAdmin ? <Navigate to='/admin' /> : <LoginAdmin />} />
      </Routes>
    </Suspense>
  )
}

export default App
