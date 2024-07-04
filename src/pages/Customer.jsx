import {AppBar, Toolbar, Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { destroy, index, update } from '../api/user'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import checkAdmin from '../hoc/checkAdmin'
import { store } from '../redux/store'


function Customer() {
    const [warnings, setWarnings] = useState ({})
    const [loading, setLoading] = useState(null)
    const [rows,setRows] = useState([])
    const [editDialog, setEditDialog] = useState(null)
    const [deleteDialog, setDeleteDialog] = useState(null)
    const user = useSelector(state => state.auth.user)
    const [cookies,setCookie,removeCookie] = useCookies()
    const columns = [
      {field: 'id', headerName:'Customers', minWidth: 220},
      {field: 'first_name', headerName:'First Name', minWidth: 220},
      {field: 'last_name', headerName:'Last Name', minWidth: 220},
      {field: 'address', headerName:'Address', minWidth: 220},
      {field: 'actions', headerName:'', sortable: false, filterable: false, renderCell: params => (
        <Box sx={{ display:"flex", gap:2, height:"100%"}}>
            <Button color="info" onClick={() => setEditDialog({...params.row})} variant="contained" sx={{backgroundColor: "#2D9596", margin: 1, boxShadow: "0 0 5px black"}}>Edit</Button>
            <Button color="error" onClick={() => setDeleteDialog(params.row.id)} variant="contained" sx={{backgroundColor: "#265073", margin: 1, boxShadow: "0 0 5px black"}}>Delete</Button>
        </Box>
      ), minWidth: 230}
    ]            
    
    const logout = () => {
      removeCookie("AUTH_TOKEN")
      removeCookie("ADMIN_TOKEN")
    }
  
    const refreshData = () => {
      index(cookies.ADMIN_TOKEN).then(res =>{
        if(res?.ok){
          res.data = res.data.map(d => {
            d = {...d, ...d.customer}
            return d
          })
          setRows(res.data)
          
        }else{
          toast.error(res?.message ?? "Something went wrong")
        }
      })  
    }
    useEffect(refreshData,[])

    const onDelete = () => {
        if(!loading){
            setLoading(true)
            destroy(deleteDialog, cookies.ADMIN_TOKEN).then(res =>{
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
              first_name: editDialog.first_name,
              last_name: editDialog.last_name,
              address: editDialog.address
          }, editDialog.id, cookies.ADMIN_TOKEN).then(res => {
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
          <Typography id="font"variant="h6" component="div" sx={{ flexGrow:1, fontSize: 20}}>
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
          <Link onClick={(logout)} to="/" id="navlink" className="navlink"> 
          Logout
          </Link>
        </Toolbar>
        
      </AppBar>
    </Box>
    
    <Box>
    {
      user ? (
        <Box sx={{mt:15}}>
          <DataGrid sx={{height:'500px', backgroundColor: "#9AD0C2", boxShadow:"0 0 10px", border: "2px solid black", fontFamily: "Arial", fontWeight: "bold"}} columns={columns} rows={rows}/>

            <Dialog open={!!deleteDialog}>
                <DialogTitle>
                    <Typography id="font" >Delete Product</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this product ID {deleteDialog}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDeleteDialog(null)}>Close</Button>
                  <Button disabled={loading}onClick={onDelete}>confirm</Button>
                </DialogActions>
              </Dialog>

              <Dialog open={!!editDialog}>
                <DialogTitle>
                  <Typography id="font" >Edit Customer</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onEdit} sx={{ width:300, mx:'auto' }}>
                        <Box sx={{ mt:3 }}>
                            <TextField onChange={e => setEditDialog({...editDialog, first_name: e.target.value})} value={editDialog?.first_name} required id="first_name" type="text" fullWidth size= "small" label="First Name"/>
                        {
                            warnings?.first_name ?(
                            <Typography sx={{fontSize:12}} component="small" color="error">
                                {warnings.first_name}
                            </Typography>
                            ):null
                        }
                        </Box>
        
                        <Box sx={{ mt:3 }}>
                            <TextField onChange={e => setEditDialog({...editDialog, last_name: e.target.value})} value={editDialog?.last_name} id="last_name" type="text" fullWidth size= "small" label="Last Name"/>
                        {
                            warnings?.last_name ?(
                            <Typography sx={{fontSize:12}} component="small" color="error">
                                {warnings.last_name}
                            </Typography>
                            ):null
                        }
                        </Box>

                        <Box sx={{ mt:3 }}>
                            <TextField onChange={e => setEditDialog({...editDialog, address: e.target.value})} value={editDialog?.address} id="address" type="text" fullWidth size= "small" label="Address"/>
                        {
                            warnings?.address ?(
                            <Typography sx={{fontSize:12}} component="small" color="error">
                                {warnings.address}
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

export default checkAdmin(Customer)