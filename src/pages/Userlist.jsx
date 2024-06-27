import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { index } from '../api/user'
import { DataGrid } from '@mui/x-data-grid'


export default function Userlist() {
    const [rows,setRows] = useState([])
    const user = useSelector(state => state.auth.user)
    const [cookies,setCookie,removeCookie] = useCookies()
    const columns = [
      {field: 'id', headerName:'ID'},
      {field: 'name', headerName:'Username'},
      {field: 'first_name', headerName:'First Name'},
      {field: 'last_name', headerName:'Last Name'},
      {field: 'address', headerName:'Address'}
                                  
    ]                  
  
    const refreshData = () => {
      index(cookies.AUTH_TOKEN).then(res =>{
        if(res?.ok){
          setRows(res.data)
        }else{
          toast.error(res?.message ?? "Something went wrong")
        }
      })
    }
    useEffect(refreshData,[])
  return (
    <Container>


    <Box id="body">
    <Box id="header">
      <Box id="navbar">  
      <Typography id="Bluepay" variant="h5">
      Bluepay
     </Typography>                                                       
      <Link to="/" id="navlink" className="navlink"> 
    Go back
      </Link>
      <Link to="/login" id="navlink" className="navlink"> 
      Login
      </Link>
      |
      <Link to="/login" id="navlink" className="navlink"> 
      Sign out
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