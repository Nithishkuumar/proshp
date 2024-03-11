import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Adminroutes = () => {
    const {userInfo} = useSelector((state)=>state.auth)
    console.log(userInfo);
  return userInfo.isAdmin ?(<Outlet/>):(<Navigate to="/" replace/>)
}

export default Adminroutes
