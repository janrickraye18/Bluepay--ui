import {AppBar, Toolbar, Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { hasPaid, index, indexComment } from '../api/order'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import checkAdmin from '../hoc/checkAdmin'

function Admin() {
    const [warnings, setWarnings] = useState ({})
    const [loading, setLoading] = useState(null)
    const [rows, setRows] = useState([])
    const [rows2, setRows2] = useState([])
    const user = useSelector(state => state.auth.user)
    const [cookies, setCookie, removeCookie] = useCookies()
    const [paidDialog, setpaidDialog] = useState(null)
    const columns = [
      {field: 'id', headerName:'Orders', minWidth: 130},
      {field: 'customer_id', headerName:'Customer ID', minWidth: 130},
      {field: 'product_id', headerName:'Product ID', minWidth: 130},
      {field: 'quantity', headerName:'Quantity', minWidth: 130},
      {field: 'address', headerName:'Address', minWidth: 130},
      {field: 'delivery_date', headerName:'Delivery Date', minWidth: 180},
      {field: 'hasPaid', headerName:'Has Paid', minWidth:130},
      {field: 'actions', headerName:'', sortable: false, filterable: false, hideable: false, renderCell: params => (
        <Box>
            <Button onClick={() => setpaidDialog(params.row.id)} variant="contained" sx={{backgroundColor: "#265073"}}>Paid</Button>
        </Box>
      ), minWidth: 180}
    ]
    
    const columns2 = [
      {field: 'id', headerName:'Comments', minWidth: 250},
      {field: 'customer_id', headerName:'Customer ID', minWidth: 250},
      {field: 'order_id', headerName:'Order ID', minWidth: 250},
      {field: 'comment', headerName:'Comment', minWidth: 250},
      
    ]   
  
    const refreshData = () => {
      index(cookies.ADMIN_TOKEN).then(res =>{
        if(res?.ok){
          setRows(res.data)
        }else{
          toast.error(res?.message ?? "Something went wrong")
        }
      })

      indexComment(cookies.ADMIN_TOKEN).then(res =>{
        if(res?.ok){
          setRows2(res.data)
        }else{
          toast.error(res?.message ?? "Something went wrong")
        }
      })
    }
    useEffect(refreshData,[])

    const logout = () => {
      removeCookie("AUTH_TOKEN")
      removeCookie("ADMIN_TOKEN")
    }

    const onPaid = () => {
      if(!loading){
          setLoading(true)
          hasPaid( paidDialog, cookies.ADMIN_TOKEN).then(res =>{
              if(res?.ok){
                  toast.success(res.message ?? "Product has been deleted")
                  refreshData()
                  setpaidDialog(null)
              }
              else{
                  toast.error(res.message ?? "something went wrong")
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
          <Typography id="font"variant="h6" component="div" sx={{ flexGrow:1, fontSize: 20}}>
            Bluepay
          </Typography>
          <Link to="/customer" id="navlink" className="navlink"> 
          Customers
          </Link>
          |
          <Link to="/product" id="navlink" className="navlink"> 
          Products
          </Link>
          |
          <Link onClick={(logout)} to="/" id="navlink" className="navlink"> 
          Logout
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    


    <Box>
    <Typography id="font" variant='h1' sx={{ mt:10, fontSize: 50, color: "white"}}>Hello, Admin</Typography>
    {
      user ? (
        <Box sx={{mt:2}}>
          <DataGrid sx={{height:'500px', backgroundColor: "#9AD0C2", boxShadow:"0 0 10px", border: "2px solid black", fontFamily: "Arial", fontWeight: "bold"}} columns={columns} rows={rows}/>

          <DataGrid sx={{mt:15, mb:10, height:'500px', backgroundColor: "#9AD0C2", boxShadow:"0 0 10px", border: "2px solid black", fontFamily: "Arial", fontWeight: "bold"}} columns={columns2} rows={rows2}/>
        
          <Dialog open={!!paidDialog}>
                <DialogTitle>
                    <Typography id="font" >Delete Product</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure order ID {paidDialog} is paid?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{display: !!paidDialog ? "flex" : "none"}}>
                  <Button onClick={() => setpaidDialog(null)}>Close</Button>
                  <Button disabled={loading} onClick={onPaid}>confirm</Button>
                </DialogActions>
              </Dialog>

        </Box>
      ):null
      
    }
    </Box>
    </Container>
  )
}

export default checkAdmin(Admin)