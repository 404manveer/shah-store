import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import AuthLayout from '../components/auth/AuthLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'

const MainRoutes = () => {
  return (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/' element={<AuthLayout/>} >
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
    </Route>

  </Routes>
  )
}

export default MainRoutes