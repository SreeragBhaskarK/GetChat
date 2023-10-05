import './App.css'
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import React, { Suspense, memo, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import routes from './services/routes';
import { Admin } from './widgets/layout/admin';
import { Layout } from './widgets/layout';
import { Dna } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import NavSideBar from './widgets/layout/user/NavSideBar';
import NavBarCheck from './widgets/layout/NavBar';

function App() {
  const location = useLocation()
  const [type, setType] = useState<string>('')


  useEffect(() => {
    if (location.pathname.includes("/admin")) {
      setType('admin')
    } else  {

      setType('user')

      // The string does not contain "/admin"

    }

  }, [location.pathname])


  const excludeNavBarRoutes = ['/login', '/signup', '/forgot-password','/500','/verification','/otp-verification','/video_call','/admin/login'];
  const shouldRenderNavBar = !excludeNavBarRoutes.includes(location.pathname);
  return (
    <>
    {shouldRenderNavBar &&  <NavBarCheck type={type} />}
      <Suspense fallback={<div className='w-screen h-screen flex justify-center items-center'><Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"

      /></div>} >
        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Layout />

      </Suspense>
    </>
  )
}

export default memo(App)
