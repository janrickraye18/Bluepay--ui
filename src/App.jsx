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
  ])
 
  return (

    <Provider store={store}>

  <RouterProvider router={router} /> 
  
  </Provider>
  )
}

export default App
