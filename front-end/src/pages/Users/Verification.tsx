import React, { useEffect, useState } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom';
import api from '../../services/api';
import { useDispatch } from 'react-redux'
import { addUserData, loginCheck } from "../../redux/userSlice"


const Verification = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const token = queryParams.get('token');
    const email = queryParams.get('email');
    const [message, setMessage] = useState('')
    useEffect(()=>{

        api.verification({token,email,type:'signup'}).then((response)=>{
            console.log(response,'///////email//');
            if (response.data.success) {
                dispatch(addUserData(response.data.data))
                dispatch(loginCheck(true))
                navigate('/')
            }
        }).catch((err)=>{
            console.log(err);
            setMessage(err.response.data.message)
            
        })
        console.log(token,email,'//////////////');
    },[token,email])
    
  return (
    <div>{message}</div>
  )
}

export default Verification