import { Box, Button, Container, TextField, Typography} from '@mui/material'
import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginAPI } from '../api/auth'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import { toast } from 'react-toastify'
import '../index.css'

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
      if(name == "shawnN" && password == "123456789"){
        setCookie("AUTH_TOKEN",res.data.token) 
        dispatch(login(res.data))
        navigate("/admin")
        toast.success(res?.message ?? "Logged in Succesfully")
      }else if(res?.ok){
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
      <Box id="loginBox" sx={{ minHeight:'90vh', display:'flex', justifyContent:'center', mt: 5 }}>
        <Box id="loginBorder" sx={{ height:500, width:500 , boxShadow:'black 1px 2px  20px 5px', borderRadius:4, backgroundColor:"#E6F4F1"}}>

          <Typography id="font" variant='h1' sx={{ textAlign:'center', mt:10, mb:3, mr:50 ,fontSize:50 }}>
            Login
          </Typography> 

        <Box component="form" onSubmit={onSubmit} sx={ {width:300, mx:'auto',mr:75 }}>

          <Box sx={{ mt:3 }}> 
            <TextField id='input' onChange={(e) => setName(e.target.value)} value={name} fullWidth size='small' type='text' label='Username'></TextField>
          </Box>

          <Box sx={{ mt:3 }}> 
            <TextField id='input' onChange={(e) => setPassword(e.target.value)} value={password} fullWidth size='small' type='password' label='Password'></TextField>
          </Box>

          <Box sx={{ mt:3,textAlign:'center' }}>
            <Button type="submit" variant='contained'>Login</Button>
          </Box>

          <Box sx={{ mt:4, textAlign:'center' }}>
            <Link to ="/register">
              <Typography id="font" sx={{color: "#265073", fontSize: 13}}>
                Don't have account an yet?
              </Typography>
            </Link>
          </Box>
  
        </Box>
      </Box>
    </Box>
   </Container>
  )
}