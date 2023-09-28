import React, { LazyExoticComponent } from 'react'
import '../assets/User/css/user.css'
import { useSelector } from 'react-redux'



const Home = React.lazy(() => import('../pages/Users/Home'))


const UserProfile = React.lazy(() => import('../pages/Users/userProfile'))

const EditProfile = React.lazy(() => import('../pages/Users/EditProfile'))
const Message = React.lazy(() => import('../pages/Users/Messages'))
const Settings = React.lazy(() => import('../pages/Users/Settings'))
const ServerError = React.lazy(() => import('../widgets/error/ServerError'))
const Explore = React.lazy(()=> import ('../pages/Users/Explore'))
const Login = React.lazy(() => import('../pages/Users/Login'))
const Signup = React.lazy(() => import('../pages/Users/Signup'))
const Verification = React.lazy(() => import('../pages/Users/Verification'))
const OtpVerification = React.lazy(() => import('../pages/Users/OtpVerification'))
const ForgotPassword = React.lazy(() => import('../pages/Users/ForgotPassword'))
const VideoCall = React.lazy(()=> import ('../pages/Users/VideoCall'))

/* console.log(user,'//////////'); */

export const routes = [
  {
    name: "Home",
    path: '/',
    element: <Home />,
    type:'private'
  }, {
    name: "user",
    path: '/:username',
    element: <UserProfile />,
    type:'private'
  }, {
    name: "Profile Edit",
    path: '/settings/edit-profile',
    element: <EditProfile />,
    type:'private'
  }, {
    name: "Message",
    path: '/messages',
    element: <Message />,
    type:'private'
  }, {
    name: "Settings",
    path: '/settings',
    element: <Settings />,
    type:'private'
  }, {
    name: "500",
    path: '/500',
    element: <ServerError />,
    type:'private'
  },{
    name:'explore',
    path:'/explore',
    element:<Explore/>,
    type:'private'
  },{
    name:'login',
    path:'/login',
    element:<Login/>,
    type:'public'
  },{
    name:'signup',
    path:'/signup',
    element:<Signup/>,
    type:'public'
  },{
    name:'verification',
    path:'/verification',
    element:<Verification/>,
    type:'public'
  },{
    name:'otp verification',
    path:'/otp-verification',
    element:<OtpVerification/>,
    type:'public'
  },{
    name:'forgot password',
    path:'/forgot-password',
    element:<ForgotPassword/>,
    type:'public'
  },{
    name:"video call",
    path:'/video_call',
    element:<VideoCall/>,
    type:'private'
  }
]

export default routes