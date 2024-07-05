import {AppBar, Toolbar, Box, Container, Typography , IconButton} from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import { useCookies } from 'react-cookie'
import img1 from '../pages/images/water.jpg'
import img2 from '../pages/images/water2.jpg'
import img3 from '../pages/images/water3.jpg'
import gif2 from '../pages/images/gif2.gif'
import '../navbar.css'
import '../About.css'

export default function About() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const logout = () => {
    removeCookie("AUTH_TOKEN")
    removeCookie("ADMIN_TOKEN")
  }
  return (
    <Container id="aboutBody" sx={{borderRadius:'10px', backgroundColor:'white', padding:'50px', width:'2000px'}}>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{backgroundColor: "#008E9B"}}>
        <Toolbar>
          <Typography id="font" variant="h6" component="div" sx={{ flexGrow: 1 ,fontSize: 20}}>
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
          <Link onClick={(logout)} to="/" id="navlink" className="navlink"> 
          Logout
          </Link>
        </Toolbar>
      </AppBar>

      
    </Box>  
      <Box id="container" >
      <img src={gif2}/>
    <Box>
    <Box className="nav-container">
      <ul>                               
        <li><a href="#us"><h3>About</h3></a></li>                                                                                           
        <li><a href="#us2"><h3>Explore</h3></a></li>
        <li><a href="#us3"><h3>Thank you</h3></a></li>
        <li><a href="#us4"><h3>Contact us</h3></a></li>
      </ul>
    </Box>
    </Box>
      <Box id="main">
        <Box className="section" id="us">
        <Typography>
        <img src={img1} id='img1'/>


          <Typography variant='h2'>About us</Typography>
          <br />
          <Typography variant='h6'>
        We understand the importance of clean and safe drinking water for maintaining overall well-being. That's why we employ state-of-the-art purification technology to ensure that every drop of water that passes through our station meets the highest standards of purity. Our advanced filtration processes remove impurities while retaining essential minerals, delivering water that not only tastes great but also supports your health.
        </Typography>
        </Typography>
        </Box >
        <Box className="section" id="us2" >
        
        <Typography>
        <img src={img2} id="img2" />
        <Typography variant='h2'>Explore</Typography>
        <br />
        <Typography variant='h6'>
        Customer satisfaction is our top priority, and we strive to exceed your expectations with every visit. Our friendly and knowledgeable staff are here to assist you with all your hydration needs, whether you're filling up a single bottle or stocking up for your entire household or business.
        </Typography>
        </Typography>
        </Box >
        <Box className="section"  id="us3">
        <Typography>
          <img src={img3} id="img3" />
          <Typography variant='h2'>Thankyou</Typography>
          <br />
          <Typography variant='h6'>
        Thank you for choosing <b style={{fontFamily:'fantasy'}}>Bluepay</b> as your trusted source for users, let's hydrate responsibly and make a positive impact on our health and the environment.
        </Typography>
        </Typography>
        </Box >
        <Box className="section"  id="us4">
        <Typography>
          <Typography variant='h2'>Contact us</Typography>
          <br />
          <Typography variant='h6'>
          We are here to help with any questions or concerns you may have. Reach out to us at <b style={{fontFamily:'Sans-serif'}}>Bluepay@gmail.com</b>  to learn more about our services and meet our friendly staff.
        </Typography>
        </Typography>
        </Box >
      </Box>
    </Box>
    </Container>
    )
  }