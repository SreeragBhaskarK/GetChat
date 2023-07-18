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
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgot_password' element={<ForgotPasswordPage />} />
        {/* Admin */}
        <Route path='/admin/login' element={<LoginPageAdmin />} />
        <Route path='/admin' element={<DashboardPageAdmin />} />
        <Route path='/admin/audience' element={<AudiencePageAdmin />} />


        <Route path='*' element='error' />
      </Routes>
    </Suspense>
  )
}

export default App
