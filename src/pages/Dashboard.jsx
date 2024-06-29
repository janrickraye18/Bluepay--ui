import {AppBar, Toolbar, Box, Container, Typography , IconButton} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { index } from '../api/user'
import { DataGrid } from '@mui/x-data-grid'

export default function Dashboard() {
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

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{backgroundColor: "#008E9B"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: "black", fontFamily: "MyFirstFont"}}>
            Bluepay
          </Typography>
          <Link to="/about" id="navlink" className="navlink"> 
          About Us
          </Link>
          |
          <Link to="/order" id="navlink" className="navlink"> 
          Order
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    


    <Box>
    <Typography variant='h1' sx={{mt: 10}}>Hello, {user?.name ?? "Guest"}</Typography>
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