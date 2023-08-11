import React from 'react'
import './assets/Admin/css/admin.css'
const Dashboard = React.lazy(()=> import('./pages/Admin/Dashboard'))
const Audience = React.lazy(()=> import('./pages/Admin/Audience'))
const LoginAdmin = React.lazy(()=> import('./pages/Admin/LoginAdmin'))
const Posts = React.lazy(()=> import ('./pages/Admin/Posts'))


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
    }

]

export default routesAdmin