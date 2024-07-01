import {AppBar, Toolbar, Box, Container, Typography , IconButton} from '@mui/material'
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

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{backgroundColor: "#008E9B"}}>
        <Toolbar>
          <Typography id="font" variant="h6" component="div" sx={{ flexGrow: 1 ,color: "black"}}>
            Bluepay
          </Typography>
          <Link to="/dashboard" id="navlink" className="navlink"> 
          Dashboard
          </Link>
          |
          <Link to="/about" id="navlink" className="navlink"> 
          About Us
          </Link>
          |
          <Link to="/order" id="navlink" className="navlink"> 
          Order
          </Link>
          |
          <Link to="/login" id="navlink" className="navlink"> 
          Logout
          </Link>
        </Toolbar>
      </AppBar>
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
