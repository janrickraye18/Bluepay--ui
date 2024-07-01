import {AppBar, Toolbar, Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct, destroy, index, update } from '../api/product'
import { addOrder } from '../api/order'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import checkAuth from '../hoc/checkAuth'
import { store } from '../redux/store'

function Product() {
    const [warnings, setWarnings] = useState ({})
    const [loading, setLoading] = useState(null)
    const [rows,setRows] = useState([])
    const [createDialog, setCreateDialog] = useState(false)
    const [editDialog, setEditDialog] = useState(null)
    const [deleteDialog, setDeleteDialog] = useState(null)
    const user = useSelector(state => state.auth.user)
    const [cookies,setCookie,removeCookie] = useCookies()
    const columns = [
      {field: 'id', headerName:'Products', minWidth: 300},
      {field: 'item', headerName:'Item', minWidth: 300},
      {field: 'price', headerName:'Price', minWidth: 300},
      {field: 'actions', headerName:'', sortable: false, filterable: false, renderCell: params => (
        <Box sx={{ display:"flex", gap:2, height:"100%"}}>
            <Button color="info" onClick={() => setEditDialog({...params.row})} variant="contained" sx={{backgroundColor: "#2D9596", margin: 1, boxShadow: "0 0 5px black"}}>Edit</Button>
            <Button color="error" onClick={() => setDeleteDialog(params.row.id)} variant="contained" sx={{backgroundColor: "#265073", margin: 1, boxShadow: "0 0 5px black"}}>Delete</Button>
        </Box>
      ), minWidth: 230}
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

    const onSubmit = (e)=> {
      e.preventDefault()
      const body = {
            item: $("#item").val(),
            price: $("#price").val()
      }
        addProduct(body, cookies.AUTH_TOKEN).then(res => {
            if(res?.ok){
                toast.success(res?.message ?? "Product Added")
                setCreateDialog(false)
                refreshData()
                setWarnings({})
              }else{
                toast.error(res?.message ?? "Something went wrong")
                setWarnings(res?.errors)
              }
        })
    }
  

  const onDelete = () => {
    if(!loading){
        setLoading(true)
        destroy(deleteDialog, cookies.AUTH_TOKEN).then(res =>{
            if(res?.ok){
                toast.success(res.message ?? "Product has been deleted")
                refreshData()
                setDeleteDialog(null)
            }
            else{
                toast.error(res.message ?? "something went wrong")
            }
        }).finally(() => {
            setLoading(false)
        })
    }
}

const onEdit = e => {
    e.preventDefault()
    if(!loading){
        setLoading(true)
        update({
            item: editDialog.item,
            price: editDialog.price
        }, editDialog.id, cookies.AUTH_TOKEN).then(res => {
            if(res?.ok){
                toast.success(res.message ?? "Product has been updated")
                refreshData()
                setEditDialog(null)
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

          <Typography id="font" variant="h6" component="div" sx={{ flexGrow:1, color:"black", ml:3 }}>
            Bluepay
          </Typography>
          <Link to="/admin" id="navlink" className="navlink"> 
          Dashboard
          </Link>
          |
          <Link to="/customer" id="navlink" className="navlink"> 
          Customers
          </Link>
          |
          <Link to="/product" id="navlink" className="navlink"> 
          Products
          </Link>
          |
          <Link to="/login" id="navlink" className="navlink"> 
          Logout
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
        
    
    
        <Box>
        
        {
          index ? (
            <Box sx={{mt:10}}>
            <Box sx={{ display:"flex", justifyContent:"end" }}>
                <Button id="font" onClick={() => setCreateDialog(true)} sx={{ mr:5, mb:3, color:"black", boxShadow:"0 0 10px black", backgroundColor: "#2D9596" }}>Add Product</Button>
            </Box>
          <DataGrid sx={{height:'500px', backgroundColor: "#9AD0C2", boxShadow:"0 0 10px", border: "2px solid black", fontFamily: "Arial", fontWeight: "bold"}} columns={columns} rows={rows}/>
            <Dialog open={!!createDialog}>
                <DialogTitle>
                  <Typography id="font" >Add Product</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onSubmit} sx={{ width:300, mx:'auto' }}>
                        <Box sx={{ mt:3 }}>
                            <TextField required id="item" type="text" fullWidth size= "small" label="Item"/>
                        {
                            warnings?.item ?(
                            <Typography sx={{fontSize:12}} component="small" color="error">
                                {warnings.item}
                            </Typography>
                            ):null
                        }
                        </Box>
        
                        <Box sx={{ mt:3 }}>
                            <TextField id="price" type="text" fullWidth size= "small" label="Price"/>
                        {
                            warnings?.price ?(
                            <Typography sx={{fontSize:12}} component="small" color="error">
                                {warnings.price}
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
                  <Button onClick={() => setCreateDialog(false)}>Close</Button>
                  <Button onClick={() => {$("#submit_btn").trigger("click")}}>Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={!!deleteDialog}>
                <DialogTitle>
                    <Typography id="font" >Delete Product</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this product ID {deleteDialog}?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{display: !!deleteDialog ? "flex" : "none"}}>
                  <Button onClick={() => setDeleteDialog(null)}>Close</Button>
                  <Button disabled={loading} onClick={onDelete}>confirm</Button>
                </DialogActions>
              </Dialog>

              <Dialog open={!!editDialog}>
                <DialogTitle>
                  <Typography id="font" >Edit Product</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onEdit} sx={{ width:300, mx:'auto' }}>
                        <Box sx={{ mt:3 }}>
                            <TextField onChange={e => setEditDialog({...editDialog, item: e.target.value})} value={editDialog?.item} required id="item" type="text" fullWidth size= "small" label="Item"/>
                        {
                            warnings?.price ?(
                            <Typography sx={{fontSize:12}} component="small" color="error">
                                {warnings.price}
                            </Typography>
                            ):null
                        }
                        </Box>
        
                        <Box sx={{ mt:3 }}>
                            <TextField onChange={e => setEditDialog({...editDialog, price: e.target.value})} value={editDialog?.price} id="price" type="text" fullWidth size= "small" label="Price"/>
                        {
                            warnings?.price ?(
                            <Typography sx={{fontSize:12}} component="small" color="error">
                                {warnings.price}
                            </Typography>
                            ):null
                        }
                        </Box>

                        <Box  sx={{ mt:3, textAlign:'center' }}>
                            <Button id="edit_btn" disabled={loading} type="submit" sx={{display: "none"}}>Register</Button>
                        </Box>

                    </Box>
                </DialogContent>
                <DialogActions sx={{display: !!editDialog ? "flex" : "none"}}>
                  <Button onClick={() => setEditDialog(null)}>Close</Button>
                  <Button disabled={loading} onClick={() => $("#edit_btn").trigger("click")}>Update</Button>
                </DialogActions>
            </Dialog>

        </Box>
      ):null
    }
    </Box>
    </Container>

  )
}

export default checkAuth(Product)
