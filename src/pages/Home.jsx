import { Box, Button, Container, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { useCookies } from 'react-cookie'
import React, { useEffect } from 'react'
import '../navbar.css'

export default function Home() {

  return(

  <Container>

  <Box id="homeBox"sx={{minHeight:'80vh',display:'flex',justifyContent:'center', alignItems:'center'}}>
    <Box id="home" sx={{textAlign: "center",boxShadow:'1px 2px  20px 5px', }}>
  
      <Typography  id="font" variant='h1' sx={{ color: "#3D3838", fontSize: 40, ml:60, mt: 15}}>
        Get Started!
      </Typography>

      <Box sx={{display:'flex', justifyContent: "center",mt: 5, gap: 10, ml:60}}>

        <Link to="/login">
          <Button variant="contained"sx={{fontSize: 20}}>Login</Button>
        </Link>
 
        <Link to="/register">
          <Button variant="contained"sx={{fontSize: 20}}>Sign Up</Button>
        </Link>
 
      </Box>

    </Box>
  </Box>

  </Container>

  )
}
