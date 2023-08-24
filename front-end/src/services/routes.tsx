import React, { LazyExoticComponent } from 'react'
import '../assets/User/css/user.css'
import { useSelector } from 'react-redux'

const Home = React.lazy(() => import('../pages/Users/Home'))


const UserProfile = React.lazy(() => import('../pages/Users/userProfile'))

const EditProfile = React.lazy(()=> import('../pages/Users/EditProfile'))
const Message = React.lazy(()=> import('../pages/Users/Messages'))

/* console.log(user,'//////////'); */

export const routes = [
  {
    name: "Home",
    path: '/',
    element: <Home />
  }, {
    name: "user",
    path: '/:username',
    element: <UserProfile />
  },{
    name:"Profile Edit",
    path:'/edit-profile',
    element:<EditProfile/>
  },{
    name:"Message",
    path:'/messages',
    element:<Message/>
  }/* ,{
    name:"OTP Verification",
    path:'/otp-verification',
    element:<OtpVerification/>
  } */
]

export default routes