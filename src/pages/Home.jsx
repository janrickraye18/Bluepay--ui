import {Box, Container,Typography, } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import '../navbar.css'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import { Cookies } from 'react-cookie'

export default function Home() {
  // const refreshData = () => {
  //   index(Cookies.AUTH_TOKEN).then(res =>{
  //     console.log(res)
  //   })
  // }
  // useEffect(refreshData,[])

  const user = useSelector(state => state.auth.user)
  const columns = [
    {field: 'id', headerName:'ID'},
    {field: 'name', headerName:'Username'},
    {field: 'first_name', headerName:'First Name'},
    {field: 'last_name', headerName:'Last Name'},
    {field: 'address', headerName:'Address'}
                                
  ]                  

  const rows=[]
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

<Box>
<Typography variant='h1'>Hello,{user?.name ?? "Guest"}</Typography>
{
  user ? (
    <Box sx={{mt:2}}>
      <DataGrid sx={{height:'500px'}} columns={columns} rows={rows}/>
    </Box>
  ):null
  
}
</Box>


</Container>





  
    


  )
}
