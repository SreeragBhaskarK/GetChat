import React, { LazyExoticComponent } from 'react'
import '../assets/User/css/user.css'
import { useSelector } from 'react-redux'


const Home = React.lazy(() => import('../pages/Users/Home'))


const UserProfile = React.lazy(() => import('../pages/Users/userProfile'))

const EditProfile = React.lazy(()=> import('../pages/Users/EditProfile'))
const Message = React.lazy(()=> import('../pages/Users/Messages'))
const Settings = React.lazy(()=> import('../pages/Users/Settings'))

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
    path:'/settings/edit-profile',
    element:<EditProfile/>
  },{
    name:"Message",
    path:'/messages',
    element:<Message/>
  },{
    name:"Settings",
    path:'/settings',
    element:<Settings/>
  }
]

export default routes