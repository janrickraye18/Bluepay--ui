import { Box, Container, Typography  } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import img1 from '../pages/images/water.jpg'
import img2 from '../pages/images/water2.jpg'
import img3 from '../pages/images/water3.jpg'
import '../navbar.css'
import '../About.css'

export default function About() {
  return (
    <Container>
    <Box id="body">
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
     

    <Box id="container" >
  
        <Box id="Boxes" className="box1">
         <img src={img1} id="img1" />
         <Typography variant='h6' >
         We understand the importance of clean and safe drinking water for maintaining overall well-being. That's why we employ state-of-the-art purification technology to ensure that every drop of water that passes through our station meets the highest standards of purity. Our advanced filtration processes remove impurities while retaining essential minerals, delivering water that not only tastes great but also supports your health.
         </Typography>
        </Box>

        <Box id="Boxes" className="box2">
        <img src={img2} id="img1" />
         <Typography variant='h6' >
         Customer satisfaction is our top priority, and we strive to exceed your expectations with every visit. Our friendly and knowledgeable staff are here to assist you with all your hydration needs, whether you're filling up a single bottle or stocking up for your entire household or business.
         </Typography>
        </Box>

        <Box id="Boxes" className="box3">
        <img src={img3} id="img1" />
         <Typography variant='h6' >
         Thank you for choosing <b style={{fontFamily:'fantasy'}}>Bluepay</b> as your trusted source for users, let's hydrate responsibly and make a positive impact on our health and the environment.
         </Typography>
        </Box>
   

    </Box>
    </Container>

   
   

   


  )
}
