import {AppBar, Toolbar, Box, Container, Typography, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  product } from '../api/user'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'



export default function Order() {
    const [rows,setRows] = useState([])
    const products = useSelector(state => state.auth.product)
    const [cookies,setCookie,removeCookie] = useCookies()
    const columns = [
      {field: 'id', headerName:'ID'},
      {field: 'item', headerName:'Item'},
      {field: 'price', headerName:'Price'},
                                  
    ]                  
  
    const refreshData = () => {
      product(cookies.AUTH_TOKEN).then(res =>{
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

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: "black", fontFamily: "MyFirstFont", ml: 3}}>
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
        </Toolbar>
      </AppBar>
    </Box>
        
    
    
        <Box>
        {/* <Typography variant='h1' sx={{mt: 10}}>Hello, {user?.name ?? "Guest"}</Typography> */}
        {
          product ? (
            <Box sx={{mt:2, backgroundColor: "white", display: "flex", mt: 15}}>
              <DataGrid sx={{height:'500px', width: 100, fontFamily: "Arial", boxShadow: "0px 0px 10px"}} columns={columns} rows={rows}/>
            </Box>
          ):null
          
        }
        </Box>
        </Container>

  )
}
