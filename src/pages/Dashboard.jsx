import {AppBar, Toolbar, Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addComment, index, showOrder } from '../api/order'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import checkAuth from '../hoc/checkAuth'

function Dashboard() {
    const [warnings, setWarnings] = useState ({})
    const [loading, setLoading] = useState(null)
    const [rows,setRows] = useState([])
    const [createDialog, setCreateDialog] = useState(null)
    const [cookies,setCookie,removeCookie] = useCookies()
    const user = useSelector(state => state.auth.user)
    const cid = user?.customer?.id
    const columns = [
      {field: 'id', headerName:'Orders', minWidth: 130},
      {field: 'customer_id', headerName:'Customer ID', minWidth: 130},
      {field: 'product_id', headerName:'Product ID', minWidth: 130},
      {field: 'quantity', headerName:'Quantity', minWidth: 130},
      {field: 'delivery_date', headerName:'Delivery Date', minWidth: 170},
      {field: 'hasPaid', headerName:'Has Paid', minWidth:130},
      {field: 'actions', headerName:'', sortable: false, filterable: false, hideable: false, renderCell: params => (
        <Box>
            <Button onClick={() => setCreateDialog(params.row.id)} variant="contained" sx={{backgroundColor: "#265073"}}>Add Comment</Button>
        </Box>
      ), minWidth: 200}
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
        }
      })
    }
    useEffect(refreshData,[])


    const onSubmit = (e)=> {
      e.preventDefault()
      if(!loading){
        const body = {
          customer_id: user?.cutomer?.id,
          order_id: $("#order_id").val(),
          comment:$("#comment").val(),
        }
  
      setLoading(true)
      addComment(body, cookies.AUTH_TOKEN).then(res => {
      if(res?.ok){
        toast.success(res?.message ?? "Comment Added");
        console.log(res)
        setCreateDialog(null)
      }else {
        toast.error(res?. message ?? "Something went wrong");
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
          <Typography id="font"variant="h6" component="div" sx={{ flexGrow:1, fontSize: 20}}>
            Bluepay
          </Typography>
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
    <Typography id="font" variant='h1' sx={{ mt:10, fontSize: 50, color: "white"}}>Hello, {user?.customer?.first_name ?? "Guest"}</Typography>
    {
      user ? (
        <Box sx={{mt:2}}>
          <DataGrid
          sx={{height:'500px', backgroundColor: "#9AD0C2", boxShadow:"0 0 10px", border: "2px solid black", fontFamily: "Arial", fontWeight: "bold"}} columns={columns} rows={rows}
          />
          <Dialog open={!!createDialog}>
                <DialogTitle>
                  <Typography id="font" >Add Order</Typography>
                </DialogTitle>
                <DialogContent>
                <Box component="form" onSubmit={onSubmit} sx={{ width:300, mx:'auto' }}>                                                     
        
        <Box sx={{ mt:3 }}>
          <TextField disabled value={createDialog} id="order_id" type="text" fullWidth size= "small" label="Order ID"/>
            {
              warnings?.order_id ?(
                <Typography sx={{fontSize:12}} component="small" color="error">
                  {warnings.order_id}
                </Typography>
              ):null
            }
        </Box>

        <Box sx={{ mt:3 }}>
          <TextField  required id="comment" fullWidth size="small" label="Comment" type="text"/>
          {
            warnings?.comment ?(
              <Typography sx={{fontSize:12}} component="small" color="error">
                {warnings.comment}
              </Typography>
            ):null
          }
        </Box>

      <Box sx={{ mt:3, textAlign:'center' }}>
        <Button id="submit_btn" disabled={loading} type="submit" sx={{display: "none"}}>Create</Button>
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

export default checkAuth(Dashboard)