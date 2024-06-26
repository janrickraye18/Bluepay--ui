import {Box, Container,Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import '../navbar.css'
import { useSelector } from 'react-redux'

export default function Home() {
  const user = useSelector(state => state.auth.user)
  return (

<Box id="body">
<Typography variant='h1'>Hello,{user?.first_name ?? "Guest"}</Typography>


    <Box id="header">
      <Box id="navbar">
      <Typography id="Bluepay" variant="h5">
      Bluepay
     </Typography>

      <Link to="/About" id="navlink" className="navlink"> 
      About us
      </Link>
      <Link to="/login" id="navlink" className="navlink"> 
      Login
      </Link>
      |
      <Link to="/register" id="navlink" className="navlink"> 
      Sign Up
      </Link>
      </Box>
    </Box>                          
    </Box>


  
    


  )
}
