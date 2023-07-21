import './App.css'
import { Route, Routes } from "react-router-dom"
import React, { Suspense } from "react";

/* Users */
const HomePage = React.lazy(() => import('./pages/Users/HomePage'))
const LoginPage = React.lazy(() => import('./pages/Users/LoginPage'))
const SignupPage = React.lazy(() => import('./pages/Users/SignupPage'))
const ForgotPasswordPage = React.lazy(() => import('./pages/Users/ForgotPasswordPage'))

/* Admins */
const LoginPageAdmin = React.lazy(() => import('./pages/Admin/LoginPageAdmin'))
const AudiencePageAdmin = React.lazy(() => import('./pages/Admin/AudiencePageAdmin'))
const DashboardPageAdmin = React.lazy(() => import('./pages/Admin/DashboardPageAdmin'))

function App() {


  return (
    <Suspense >
      <Routes>
        {/* Users */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgot_password' element={<ForgotPasswordPage />} />


        {/* Side Nav  */}
        <Route path='/' element={<HomePage />} />
        <Route path='/search' />
        <Route path='/explore' />
        <Route path='/videos' />
        <Route path='/messages' />
        <Route path='/notifications' />
        <Route path='/create' />
        <Route path='/profile' />

        {/* Side Nav End */}
        {/* User End */}

        {/* Admin */}
        <Route path='/admin/login' element={<LoginPageAdmin />} />

        {/* Side Nav  */}
        <Route path='/admin' element={<DashboardPageAdmin />} />
        <Route path='/admin/posts' />
        <Route path='/admin/analystics' />
        <Route path='/admin/audience' element={<AudiencePageAdmin />} />
        <Route path='/admin/messages' />
        <Route path='/admin/notifications' />
        <Route path='/admin/advertising' />
        {/* Side Nav End */}

        {/* Admin End */}

        <Route path='*' element='error' />
      </Routes>
    </Suspense>
  )
}

export default App
