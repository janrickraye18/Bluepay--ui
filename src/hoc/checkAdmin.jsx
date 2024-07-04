import React, {useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../api/auth';
import { login } from '../redux/authSlice';

const checkAdmin = (WrappedComponent) => {
  const Authenticate = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [cookies, setCookie, removeCookie] = useCookies()
    const dispatch = useDispatch()                                                                                              

    if (!user) {
        if (cookies.ADMIN_TOKEN){
            checkToken(cookies.ADMIN_TOKEN).then(res => {
                if(res?.ok){
                    dispatch(login(res.data))
                }else{
                    removeCookie("ADMIN_TOKEN")
                }
            })
        }
    }

      return <WrappedComponent {...props} />;

  };

  return Authenticate
}

export default checkAdmin