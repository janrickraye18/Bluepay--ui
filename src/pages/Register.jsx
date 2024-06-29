
import { Box, Typography, TextField,Button, Container} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { register } from '../api/auth'
import { toast } from 'react-toastify' 
import { useState } from 'react'
import {useCookies} from 'react-cookie'
import '../index.css'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'





export default function Register() {

   const [warnings, setWarnings] = useState ({})
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()
   const [cookies, setCookie, removeCookie] = useCookies()
   const dispatch = useDispatch()

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
      toast.success(res?.message ?? "Account  has been Registered");
      setCookie("AUTH_TOKEN", res.data.token)
      dispatch(login(res.data))
      navigate("/dashboard")
      console.log(res)
     }
     else{
      toast.error(res?. message ?? "Something went wrong");
      setWarnings(res?.errors)
     }
     
    }).finally(() => {
      setLoading(false)
    })
  }
}
  return (
  <Container>
 
    <Box sx={{minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Box id="Regbox" sx={{height: 600, width: 500 , boxShadow: 'black 0px 0px 20px', borderRadius: 4, backgroundColor: "#E6F4F1"}}>

     <Typography variant="h1" sx={{textAlign: 'center', mt: 3, mb: 2 , fontFamily: "MyFirstFont", fontSize: 40}}>
                Register
     </Typography>

      <Box component="form" onSubmit={onSubmit} sx={{width:300, mx:'auto',}}>
        
        <Box sx={{mt:1}}>
        <TextField required id="name" type="text" fullWidth size= "small" label="Username"/>
        {
          warnings?.username ?(
            <Typography sx={{fontSize:12}} component="small" color="error">
             {warnings.name}
          </Typography>
          ):null
          
        }
        </Box>

        <Box sx={{mt:1}}>
        <TextField  required id="first_name"  fullWidth size="small" label="First Name" type="text"/>
        {
          warnings?.first_name ?(
            <Typography sx={{fontSize:12}} component="small" color="error">
             {warnings.email}
          </Typography>
          ):null
          
        }
        </Box>

        <Box sx={{mt:1}}>
        <TextField  required id="last_name" type="text" fullWidth size="small" label="Last Name" sx={{color:'white'}} />
        {
          warnings?.last_name ?(
            <Typography sx={{fontSize:12}} component="small" color="error">
             {warnings.station_name}
          </Typography>
          ):null
          
        }
        </Box>


        <Box sx={{mt:1}}>
        <TextField required id="password" type="password" fullWidth size= "small" label="Password"/>
        {
          warnings?.password ?(
            <Typography sx={{fontSize:12}} component="small" color="error">
             {warnings.password}
          </Typography>
          ):null
          
        }
        </Box>

        <Box sx={{mt:1}}>
        <TextField required id="password_confirmation" type="password" fullWidth size= "small" label="Confirm password"/>
        {
          warnings?.password_confirmation ?(
            <Typography sx={{fontSize:12}} component="small" color="error">
             {warnings.password_confirmation}
          </Typography>
          ):null
          
        }
        </Box>


        <Box sx={{mt:1}}>
        <TextField required id="address" fullWidth size="small"  label="Address" />
        {
          warnings?.address ?(
            <Typography sx={{fontSize:12}} component="small" color="error">
             {warnings.address}
          </Typography>
          ):null
          
        }
        </Box>

        <Box sx={{mt:1, textAlign:'center'}}>
          <Button disabled={loading} type="submit" variant="contained"sx={{color:'white'}}>Submit</Button>
        </Box>
        
      </Box>
   <Box sx={{mt:2, textAlign:'center'}}>
   <Typography>
    <Link  to="/login" style={{ marginTop:'1rem', fontFamily:'inherit'}}>
                   Already Have an Account?
    </Link>
    </Typography>
   </Box>
    </Box>
  </Box>
  </Container>
  )
}
