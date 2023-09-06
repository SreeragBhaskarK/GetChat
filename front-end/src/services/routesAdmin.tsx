import React from 'react'
import '../assets/Admin/css/admin.css'
const Dashboard = React.lazy(()=> import('../pages/Admin/Dashboard'))
const Audience = React.lazy(()=> import('../pages/Admin/Audience'))
const LoginAdmin = React.lazy(()=> import('../pages/Admin/LoginAdmin'))
const Posts = React.lazy(()=> import ('../pages/Admin/Posts'))
const Notifications = React.lazy(()=> import ('../pages/Admin/Notifications'))


export const routesAdmin = [

    {
        name: "Dashboard",
        path: '/admin',
        element: <Dashboard />
    }, {
        name: "Audience",
        path: '/admin/audience',
        element: <Audience />
    },{
        name:"Posts",
        path:'/admin/posts',
        element:<Posts/>
    },{
        name:"Notifications",
        path:'/admin/notifications',
        element:<Notifications/>
    }

]

export default routesAdmin