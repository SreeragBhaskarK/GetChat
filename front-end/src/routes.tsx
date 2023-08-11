import React, { LazyExoticComponent } from 'react'
import './assets/User/css/user.css'
const Home = React.lazy(() => import('./pages/Users/Home'))


const ForgotPassword = React.lazy(() => import('./pages/Users/ForgotPassword'))
const Profile = React.lazy(()=> import('./pages/Users/Profile'))
const EditProfile = React.lazy(()=> import('./pages/Users/EditProfile'))

export const routes = [
  {
    name: "Home",
    path: '/',
    element: <Home />
  },/* , {
    name: "Forgot Password",
    path: '/forgot-password',
    element: <ForgotPassword />
  }, */ {
    name: "Profile",
    path: '/profile',
    element: <Profile />
  },{
    name:"Profile Edit",
    path:'/edit-profile',
    element:<EditProfile/>
  }/* ,{
    name:"OTP Verification",
    path:'/otp-verification',
    element:<OtpVerification/>
  } */
]

export default routes