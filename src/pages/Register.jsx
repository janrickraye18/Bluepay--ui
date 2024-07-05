import { Box, Typography, TextField,Button, Container} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'
import { toast } from 'react-toastify' 
import $ from 'jquery'
import { useState } from 'react'
import {useCookies} from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import '../index.css'

export default function Register() {
  const [warnings, setWarnings] = useState ({})
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e)=> {
    e.preventDefault()
    if(!loading){
      const body = {
        name: $("#name").val(),
        first_name:$("#first_name").val(),
        last_name:$("#last_name").val(),
        password: $("#password").val(),
        password_confirmation:$("#password_confirmation").val(),
        address:$("#address").val(),
      }

    setLoading(true)
    register(body).then(res => {
    if(res?.ok){
      toast.success(res?.message ?? "Account  has been Registered")
      ,{
        position: "bottom-right",
      }
      setCookie("AUTH_TOKEN", res.data.token)
      dispatch(login(res.data))
      navigate("/dashboard")
    }else {
      toast.error(res?. message ?? "Something went wrong")
      ,{
        position: "bottom-right",
      }
      setWarnings(res?.errors)
    }
     
    }).finally(() => {
      setLoading(false)
    })
  }
}

  return (
  <Container>
 
    <Box id="RegBox" sx={{ minHeight:'90vh', display:'flex', justifyContent:'center', mt: 5 }}>
      <Box id="RegBorder" sx={{ height:600, width:500 , boxShadow:'black 1px 2px  20px 5px', borderRadius:4, backgroundColor:"#E6F4F1"}} >
      <Box sx={{mr:70,mt:2}}>
        <Typography id="font" variant="h1" sx={{ textAlign:'center', mt:3, mb:3, fontSize:40 }}> 
          Register
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ width:300, mx:'auto' }}>
        
          <Box sx={{ mt:3 }}>
            <TextField required id="name" type="text" fullWidth size= "small" label="Username"/>
            {
              warnings?.name ?(
                <Typography sx={{ fontSize:12 }} component="small" color="error">
                  {warnings.name}
                </Typography>
              ):null
            }
          </Box>

          <Box sx={{ mt:3 }}>
            <TextField  required id="first_name" fullWidth size="small" label="First Name" type="text"/>
            {
              warnings?.first_name ?(
                <Typography sx={{fontSize:12}} component="small" color="error">
                  {warnings.email}
                </Typography>
              ):null
            }
          </Box>

          <Box sx={{ mt:3 }}>
            <TextField  required id="last_name" type="text" fullWidth size="small" label="Last Name"/>
            {
              warnings?.last_name ?(
                <Typography sx={{ fontSize:12 }} component="small" color="error">
                  {warnings.station_name}
                </Typography>
              ):null  
            }
          </Box>

          <Box sx={{ mt:3 }}>
            <TextField required id="password" type="password" fullWidth size= "small" label="Password"/>
            {
              warnings?.password ?(
                <Typography sx={{ fontSize:12 }} component="small" color="error">
                  {warnings.password}
                </Typography>
              ):null 
            }
        </Box>

        <Box sx={{mt:3}}>
          <TextField required id="password_confirmation" type="password" fullWidth size= "small" label="Confirm password"/>
          {
            warnings?.password_confirmation ?(
              <Typography sx={{fontSize:12}} component="small" color="error">
                {warnings.password_confirmation}
              </Typography>
            ):null
          }
        </Box>
                                                  
        <Box sx={{ mt:3 }}>
          <TextField required id="address" fullWidth size="small" label="Address"/>
          {
            warnings?.address ?(
              <Typography sx={{fontSize:12}} component="small" color="error">
                {warnings.address}
              </Typography>
            ):null
          }
        </Box>

        <Box sx={{ mt:3, textAlign:'center' }}>
          <Button type="submit" variant="contained"sx={{color:'white'}}>Register</Button>
        </Box>

      </Box>

      <Box sx={{mt:4, textAlign:'center'}}>
        <Link to="/login" >
          <Typography id="font" sx={{color: "#265073", fontSize: 13}}>
            Already Have an Account?
          </Typography>
        </Link>
      </Box>
</Box>
    </Box>
  </Box>
  </Container>
  )
}
