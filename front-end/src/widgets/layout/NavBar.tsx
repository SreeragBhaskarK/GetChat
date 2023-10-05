import React, { memo, useEffect, useState,FC } from 'react'
import NavSideBar from './user/NavSideBar'
import NavSideBarAdmin from './admin/NavSideBar'
import { useSelector } from 'react-redux'


interface Type {
    type:string
}
export const NavBarCheck: FC<Type> = memo(({type}) => {

    const [NavBarType, setNavBarType] = useState<string>('')

    useEffect(()=>{
        
        
        setNavBarType(type)
    },[type])
 

    return (
        <>
       {NavBarType=='user'&&<NavSideBar/>}
       {NavBarType=='admin' && <NavSideBarAdmin/>}
        </>
    )
})

export default NavBarCheck