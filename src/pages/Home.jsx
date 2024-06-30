import { Box, Button, Container, TextField, Typography, AppBar, Toolbar, IconButton, responsiveFontSizes } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import '../navbar.css'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import { Cookies } from 'react-cookie'
import gif from   '../pages/images/Gif.gif'

export default function Start() {
  // const refreshData = () => {
  //   index(Cookies.AUTH_TOKEN).then(res =>{
  //     console.log(res)
  //   })
  // }
  // useEffect(refreshData,[])

  // const user = useSelector(state => state.auth.user)
  // const columns = [
  //   {field: 'id', headerName:'ID'},
  //   {field: 'name', headerName:'Username'},
  //   {field: 'first_name', headerName:'First Name'},
  //   {field: 'last_name', headerName:'Last Name'},
  //   {field: 'address', headerName:'Address'}
                                
  // ]                  

  // const rows=[]
  return (

<Container>
{/* <Box id="body">
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

<Box>
<Typography variant='h1'>Hello,{user?.name ?? "Guest"}</Typography>
{
  user ? (
    <Box sx={{mt:2}}>
      <DataGrid sx={{height:'500px'}} columns={columns} rows={rows}/>
    </Box>
  ):null
  
}
</Box> */}
<Box id="homeBox"sx={{minHeight:'80vh',display:'flex',justifyContent:'center', alignItems:'center'}}>
<Box id="home" sx={{textAlign: "center",boxShadow:'1px 2px  20px 5px', }}>
  {/* <Typography  id="font" variant='h1' sx={{color: "#F1FADA", fontSize: 40, margin: 2}}>
  <img src={gif} alt="" />
  </Typography> */}
  <Typography  id="font" variant='h1' sx={{ color: "#3D3838", fontSize: 40, ml:60, mt: 20}}>
    Get Started!
  </Typography>

  <Box sx={{display:'flex', justifyContent: "center",mt: 3, gap: 10, ml:60}}>
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
