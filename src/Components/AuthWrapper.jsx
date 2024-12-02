import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../Store/UserSlice';
import { getUrl, baseUrl } from '../Utility/constant';
import { Navigate } from 'react-router-dom';
import LoginShimmer from './LoginShimmer';

const AuthWrapper = ({children}) => {

    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true)

    let dispatch = useDispatch()

    const getUser = async () => {
    try{
      let res = await axios.get(baseUrl+getUrl, {withCredentials: true})

      let data = res?.data;

      if(data?.result == true){
        setUser(true)
        dispatch(addUser(data?.data))
      }else{
        setUser(false)
      }
    }catch(err){
            console.log(err);
    }finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getUser()
    }, [])
    
    if(loading){
        return <LoginShimmer></LoginShimmer>
    }

    if(user == false){
      return  <Navigate to={'/login'}></Navigate>
    }

  return children
}

export default AuthWrapper
