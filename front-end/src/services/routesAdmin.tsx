import React from 'react'
import '../assets/Admin/css/admin.css'
const Dashboard = React.lazy(()=> import('../pages/Admin/Dashboard'))
const Audience = React.lazy(()=> import('../pages/Admin/Audience'))
const LoginAdmin = React.lazy(()=> import('../pages/Admin/LoginAdmin'))
const Posts = React.lazy(()=> import ('../pages/Admin/Posts'))
const Notifications = React.lazy(()=> import ('../pages/Admin/Notifications'))
const Advertising = React.lazy(()=> import('../pages/Admin/Advertising'))


export const routesAdmin = [

    {
        name: "Dashboard",
        path: '/admin',
        element: <Dashboard />,
        type:'private'
    }, {
        name: "Audience",
        path: '/admin/audience',
        element: <Audience />,
        type:'private'
    },{
        name:"Posts",
        path:'/admin/posts',
        element:<Posts/>,
        type:'private'
    },{
        name:"Notifications",
        path:'/admin/notifications',
        element:<Notifications/>,
        type:'private'
    },{
        name:"Login",
        path:'/admin/login',
        element:<LoginAdmin/>,
        type:'public'
    },{
        name:"Advertising",
        path:'/admin/advertising',
        element:<Advertising/>,
        type:'private'
    }

]

export default routesAdmin