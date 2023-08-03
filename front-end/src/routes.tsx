import React, { LazyExoticComponent } from 'react'
import { Audience, Dashboard } from './pages/Admin'

const Home = React.lazy(() => import('./pages/Users/Home'))
const Signup = React.lazy(() => import('./pages/Users/Signup'))
const Login = React.lazy(() => import('./pages/Users/Login'))
const ForgotPassword = React.lazy(() => import('./pages/Users/ForgotPassword'))
const Profile = React.lazy(()=> import('./pages/Users/Profile'))
export const routes = [
  {
    name: "Home",
    path: '/',
    element: <Home />
  }, {
    name: "Signup",
    path: '/signup',
    element: <Signup />
  }, {
    name: "Login",
    path: '/login',
    element: <Login />
  }, {
    name: "Forgot Password",
    path: '/forgot-password',
    element: <ForgotPassword />
  }, {
    name: "Profile",
    path: '/profile',
    element: <Profile />
  },{
    name: "Dashboard",
    path: '/admin',
    element: <Dashboard />
  }, {
    name: "Audience",
    path: '/admin/audience',
    element: <Audience />
  }
]

export default routes