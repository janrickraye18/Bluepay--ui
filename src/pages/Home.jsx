import { Box, Button, Container, TextField, Typography, AppBar, Toolbar, IconButton, responsiveFontSizes } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import '../navbar.css'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import { Cookies } from 'react-cookie'

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
<Box sx={{minHeight:'80vh',display:'flex',justifyContent:'center', alignItems:'center'}}>
<Box sx={{textAlign: "center", }}>
  <Typography  id="font" variant='h1' sx={{color: "#F1FADA", fontSize: 40, margin: 2}}>
    Welcome to Bluepay!
  </Typography>
  <Typography  id="font" variant='h1' sx={{ color: "#F1FADA", fontSize: 40, margin: 2}}>
    Get Started
  </Typography>

  <Box sx={{display:'flex', justifyContent: "center",mt: 5, gap: 10}}>
  <Button variant="contained" href="/login"sx={{fontSize: 20}}>Login</Button>
  <Button variant="contained" href="/register"sx={{fontSize: 20}}>Sign Up</Button>
  </Box>
</Box>
</Box>

</Container>





  
    


  )
}
