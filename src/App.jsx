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
      path:'/About',
      element: <About />
    },
    {
      path:'/userlist',
      element: <Userlist />
    },
  ])
 
  return (

    <Provider store={store}>

  <RouterProvider router={router} /> 
  
  </Provider>
  )
}

export default App
