import './App.css'
import { Route, Routes } from "react-router-dom"
import React, { Suspense } from "react";
import { useSelector } from 'react-redux';
import routes from './routes';


function App() {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)
  const isLoggedInAdmin = useSelector((state: any) => state.admin.isLoggedInAdmin)
  return (
    <Suspense >
      <Routes>
        <Route path='*' element='error' />
        {routes.map(({path,element})=>{
          return(
            <Route path={path} element={element} />
          )
        })}
      </Routes>
    </Suspense>
  )
}

export default App
