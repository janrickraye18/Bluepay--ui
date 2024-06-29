import { Box, Button, Container, TextField, Typography, AppBar, Toolbar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gif from '../pages/images/Gif.gif'
import {login as loginAPI} from '../api/auth'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import { toast } from 'react-toastify'
import MenuIcon from '@mui/icons-material/Menu';



export default function Login() {
  const [name,setName] = useState("")
  const[password,setPassword] = useState("")
  const [cookies, setCookie,removeCookie] = useCookies()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault() 
    loginAPI({
      name,
      password
    }).then(res => {
      if(res?.ok){
        setCookie("AUTH_TOKEN",res.data.token) 
        dispatch(login(res.data))
        navigate("/dashboard")
        toast.success(res?.message ?? "Logged in Succesfully")
      }else{
        toast.error(res?.message ?? "something went wrong")
      }
    })
  }
  return (
            
    <Container>

   <Box sx={{minHeight:'90vh',display:'flex',justifyContent:'center',alignItems:'center',}}>
    <Box sx={{height: 350, width: 500, boxShadow:'black 0px 0px 20px', borderRadius:2, backgroundColor: "#E6F4F1"}}>
    <Typography variant='h1' sx={{
      textAlign:'center',
       mt: 3, mb: 3,
       fontSize: 50 , }}>
             Login
    </Typography> 
    <Box component="form" onSubmit={onSubmit} sx={{width:300, mx:'auto'}}>
        <Box sx={{mt:1}}> 
        <TextField id='input' onChange={(e)  => setName(e.target.value)} value={name} fullWidth size='small' type='text' label='Username' >
        </TextField>
        </Box>
        <Box sx={{mt:1}}> 
        <TextField id='input' onChange={(e)=> setPassword(e.target.value) } value={password} fullWidth size='small' type='password' label='Password'>
        </TextField>
        </Box>
        <Box sx={{mt:1,textAlign:'center' }}>
           <Button type="submit" variant='contained'>Login</Button>
        </Box>

        <Box sx={{mt:2, textAlign:'center'}}>
        <Link to ="/register">
        <Typography>
          Don't have account yet?
        </Typography>
        </Link>
        </Box>
       
       
    </Box>
    </Box>
   </Box>
   </Container>
  )
}