import {AppBar, Toolbar, Box, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { index } from '../api/product'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'



export default function Order() {
    const [rows,setRows] = useState([])
    const user = useSelector(state => state.auth.user)
    const [cookies,setCookie,removeCookie] = useCookies()
    const columns = [
      {field: 'id', headerName:'Products'},
      {field: 'item', headerName:'Item'},
      {field: 'price', headerName:'Price'},
      {field: 'actions', headerName:'', sortable: false, filterable: false, renderCell: params => {
        <Box>
          
        </Box>
      }},
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
          index ? (
            <Box sx={{mt:2, backgroundColor: "white", display: "flex", mt: 15}}>
              <DataGrid sx={{height:'500px', width: 100, fontFamily: "Arial", boxShadow: "0px 0px 10px"}} columns={columns} rows={rows}/>

              <Dialog open={true}>
                <DialogTitle>
                  <Typography id="font">Add Order</Typography>
                </DialogTitle>
                <DialogContent>
                  hello
                </DialogContent>
              </Dialog>
            </Box>
          ):null
          
        }
        </Box>
        </Container>

  )
}
