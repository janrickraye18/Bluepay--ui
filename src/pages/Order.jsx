import {AppBar, Toolbar, Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { index } from '../api/product'
import { add } from '../api/order'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import checkAuth from '../hoc/checkAuth'

function Order() {
    const [warnings, setWarnings] = useState ({})
    const [loading, setLoading] = useState(null)
    const [rows,setRows] = useState([])
    const [createDialog, setCreateDialog] = useState(null)
    const user = useSelector(state => state.auth.user)
    const [cookies,setCookie,removeCookie] = useCookies()
    const navigate = useNavigate()
    const columns = [
      {field: 'id', headerName:'Products', minWidth: 300},
      {field: 'item', headerName:'Item', minWidth: 300},
      {field: 'price', headerName:'Price', minWidth: 300},
      {field: 'actions', headerName:'', sortable: false, filterable: false, hideable: false, renderCell: params => (
        <Box>
            <Button onClick={() => setCreateDialog(params.row.id)} variant="contained" sx={{backgroundColor: "#265073"}}>Add Order</Button>
        </Box>
      ), minWidth: 230}
    ]                  

    const logout = () => {
      removeCookie("AUTH_TOKEN")
      removeCookie("ADMIN_TOKEN")
    }
  
    const refreshData = () => {
      index(cookies.AUTH_TOKEN).then(res =>{
        if(res?.ok){
          setRows(res.data)
        }else{
          toast.error(res?.message ?? "Something went wrong")
          ,{
            position: "bottom-right",
          }
        }
      })
    }
    useEffect(refreshData,[])

    const onSubmit = (e)=> {
      e.preventDefault()
      if(!loading){
        const body = {
          customer_id: user?.cutomer?.id,
          product_id: $("#product_id").val(),
          quantity:$("#quantity").val(),
          address:$("#address").val(),
          delivery_date: $("#delivery_date").val(),
        }
  
      setLoading(true)
      add(body, cookies.AUTH_TOKEN).then(res => {
      if(res?.ok){
        toast.success(res?.message ?? "Order Complete")
        ,{
          position: "bottom-right",
        }
        navigate("/dashboard")
        console.log(res)
        setCreateDialog(null)
      }else {
        toast.error(res?. message ?? "Something went wrong")
        ,{
          position: "bottom-right",
        }
        setWarnings(res?.errors)
        setCreateDialog(null)
      }
       
      }).finally(() => {
        setLoading(false)
      })
    }
  }
  


  return (
    <Container>

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{backgroundColor: "#008E9B"}}>
        <Toolbar>

          <Typography id="font" variant="h6" component="div" sx={{ flexGrow:1, fontSize: 20 }}>
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
        
    
    
        <Box>
        
        {
          index ? (
            
            <Box sx={{ mt: 15}}>
              <DataGrid sx={{height:'500px', backgroundColor: "#9AD0C2", boxShadow:"0 0 10px", border: "2px solid black", fontFamily: "Arial", fontWeight: "bold"}} columns={columns} rows={rows}/>

              <Dialog open={!!createDialog}>
                <DialogTitle>
                  <Typography id="font" >Add Order</Typography>
                </DialogTitle>
                <DialogContent>
                <Box component="form" onSubmit={onSubmit} sx={{ width:300, mx:'auto' }}>                                                     
        
        <Box sx={{ mt:3 }}>
          <TextField disabled value={createDialog} id="product_id" type="text" fullWidth size= "small" label="Product ID"/>
            {
              warnings?.product_id ?(
                <Typography sx={{fontSize:12}} component="small" color="error">
                  {warnings.product_id}
                </Typography>
              ):null
            }
        </Box>

        <Box sx={{ mt:3 }}>
          <TextField  required id="quantity" fullWidth size="small" label="Quantity" type="number"/>
          {
            warnings?.quantity ?(
              <Typography sx={{fontSize:12}} component="small" color="error">
                {warnings.quantity}
              </Typography>
            ):null
          }
        </Box>

        <Box sx={{ mt:3 }}>
          <TextField  required id="address" type="text" fullWidth size="small" label="Address"/>
          {
            warnings?.address ?(
              <Typography sx={{ fontSize:12 }} component="small" color="error">
                {warnings.address}
              </Typography>
            ):null  
          }
        </Box>

        <Box sx={{ mt:3 }}>
          <TextField required id="delivery_date" type="date" fullWidth size= "small" />
          {
            warnings?.delivery_date ?(
              <Typography sx={{ fontSize:12 }} component="small" color="error">
                {warnings.delivery_date}
              </Typography>
            ):null 
      }
      </Box>

      <Box sx={{ mt:3, textAlign:'center' }}>
        <Button id="submit_btn" disabled={loading} type="submit" sx={{display: "none"}}>Register</Button>
      </Box>

    </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setCreateDialog(null)}>Close</Button>
                  <Button disabled={loading} onClick={() => {$("#submit_btn").trigger("click")}}>Create</Button>
                </DialogActions>
              </Dialog>
            </Box>
          ):null
          
        }
        </Box>
        </Container>

  )
}

export default checkAuth(Order)
