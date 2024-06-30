import {AppBar, Toolbar, Box, Container, Typography , IconButton} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { index } from '../api/order'
import { DataGrid } from '@mui/x-data-grid'
import checkAuth from '../hoc/checkAuth'

function Admin() {
    const [rows,setRows] = useState([])
    const user = useSelector(state => state.auth.user)
    const [cookies,setCookie,removeCookie] = useCookies()
    const columns = [
      {field: 'id', headerName:'Orders'},
      {field: 'customer_id', headerName:'Customer ID'},
      {field: 'product_id', headerName:'Product ID'},
      {field: 'quantity', headerName:'Quantity'},
      {field: 'address', headerName:'Address'},
      {field: 'delivery_date', headerName:'Delivery Date'},
      {field: 'hasPaid', headerName:'Has Paid'},
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
          <Typography id="font"variant="h6" component="div" sx={{ flexGrow:1, fontSize: 20}}>
            Bluepay
          </Typography>
          <Link to="/about" id="navlink" className="navlink"> 
          Customers
          </Link>
          |
          <Link to="/product" id="navlink" className="navlink"> 
          Products
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    


    <Box>
    <Typography id="font" variant='h1' sx={{ mt:10, fontSize: 50, color: "white"}}>Hello, Admin</Typography>
    {
      index ? (
        <Box sx={{mt:2}}>
          <DataGrid sx={{height:'500px', backgroundColor: "#9AD0C2", boxShadow:"0 0 10px", border: "2px solid black", fontFamily: "Arial", fontWeight: "bold"}} columns={columns} rows={rows}/>
        </Box>
      ):null
      
    }
    </Box>
    </Container>
  )
}

export default checkAuth(Admin)