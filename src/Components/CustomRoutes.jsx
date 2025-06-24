import React from 'react'
import { Route, Routes } from 'react-router'
import LoginPage from '../pages/Login'
import Sign_in from '../pages/Sign_in'
import Home from '../pages/Home'

const CustomRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/sign' element={<Sign_in/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default CustomRoutes