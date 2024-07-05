import { Box, Button, Container, TextField, Typography} from '@mui/material'
import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { login as loginAPI } from '../api/auth'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import { toast } from 'react-toastify'
import '../index.css'

export default function Login() {
  const [warnings, setWarnings] = useState ({})
  const [cookies, setCookie, removeCookie] = useCookies()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
      const body = {
        name: $("#name").val(),
        password: $("#password").val(),
      }

    loginAPI(body).then(res => {
        if(res?.ok){ 
          if(res.data.role == "admin"){
            setCookie("ADMIN_TOKEN", res.data.token)
            dispatch(login(res.data))
            navigate("/admin")
          }else{
            setCookie("AUTH_TOKEN", res.data.token)
            dispatch(login(res.data))
            navigate("/dashboard")
          }
          toast.success(res?.message ?? "Logged in Succesfully"),{
            position: "bottom-right",
          }
        }else{
        toast.error(res?.message ?? "something went wrong"),{
          position: "bottom-right",
        }
          setWarnings(res?.errors)
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
            <TextField required id="name" type="text" fullWidth size= "small" label="Username"></TextField>
            {
              warnings?.name ?(
                <Typography sx={{ fontSize:12 }} component="small" color="error">
                  {warnings.name}
                </Typography>
              ):null
            }
          </Box>

          <Box sx={{ mt:3 }}> 
            <TextField required id="password" type="password" fullWidth size= "small" label="Password"></TextField>
            {
              warnings?.password ?(
                <Typography sx={{ fontSize:12 }} component="small" color="error">
                  {warnings.password}
                </Typography>
              ):null 
            }
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