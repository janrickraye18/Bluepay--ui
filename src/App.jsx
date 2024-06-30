import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Userlist from './pages/Userlist'
import Dashboard from './pages/Dashboard'
import Order from './pages/Order'
import { createTheme } from '@mui/material'
import Admin from './pages/Admin'
import Product from './pages/Product'
import Customer from './pages/Customer'



function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Home />
    },
    {
      path:'/login',
      element: <Login />
    },
    {
      path:'/register',
      element: <Register />
    },
    {
      path:'/about',
      element: <About />
    },

    {
      path:'/dashboard',
      element: <Dashboard />
    },

    {
      path:'/order',
      element: <Order />
    },
  
    {
      path:'/admin',
      element: <Admin />
    },
    {
      path:'/product',
      element: <Product />
    },
    {
      path:'/customer',
      element: <Customer />
    },
  ])
 
  return (

    <Provider store={store}>

  <RouterProvider router={router} /> 
  
  </Provider>
  )
}

export default App
