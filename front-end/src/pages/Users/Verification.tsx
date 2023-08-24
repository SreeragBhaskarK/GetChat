import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useDispatch } from 'react-redux'
import { addUserData, loginCheck } from "../../redux/userSlice"
import { NewPassword } from '.';


const Verification = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get('token');
    const email = queryParams.get('email');
    const type = queryParams.get('type');
    const [message, setMessage] = useState('')
    const [newPassword, setNewPassword] = useState(false)
    useEffect(() => {

        api.verification({ token, email, type }).then((response) => {
            console.log(response, '///////email//');
            if (response.data.success) {
                dispatch(addUserData(response.data.data))
                
                console.log(type,'//////////');
                
                if (type == 'forgot') {
                    setNewPassword(true)
                } else {
                    dispatch(loginCheck(true))
                    navigate('/')
                }
            }
        }).catch((err) => {
            console.log(err);
            setMessage(err.response.data.message)

        })
        console.log(token, email, '//////////////');
    }, [token, email])

    return (
        <>
            {
                newPassword?(
                    <NewPassword/>
                ):(
                    <div>{message}</div>
                )
            }
        </>
    )
}

export default Verification