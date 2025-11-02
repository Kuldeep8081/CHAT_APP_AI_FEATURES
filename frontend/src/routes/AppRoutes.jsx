import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginComponent from '../screens/LoginComponent'
import ForgotPasswordComponent from '../screens/forgotPasswordComponent'
import HomeComponent from '../screens/HomeComponent'
import RegisterComponent from '../screens/RegisterComponent'
const AppRoutes = () => {
  return (
    
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomeComponent/>} />
        <Route path='/login' element={<LoginComponent/>} />
        <Route path='/register' element={<RegisterComponent/>} />
        <Route path='/forgot-password' element={<ForgotPasswordComponent/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
