import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useDispatch } from 'react-redux'
import { addUserData, loginCheck } from "../../redux/userSlice"
import { NewPassword } from '.';
import { toast } from 'react-toastify'
import { Processing } from '../../widgets/shimmerEffects';


const Verification = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get('token');
    const email = queryParams.get('email');
    const type = queryParams.get('type');
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        api.verification({ token, email, type }).then((response) => {
            console.log(response, '///////email//');
            setIsLoading(false)

            if (response.data.success) {
                dispatch(addUserData(response.data.data))

                console.log(type, '//////////');

                if (type == 'forgot') {
                    toast.info('set new password', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    dispatch(loginCheck(true))
                    navigate('/')
                    toast.success('successfull login', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        }).catch((err) => {
            setIsLoading(false)

            if (err.response) {

                toast.error(err.response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/login')
            } else {
                toast.error('server error', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/login')
            }

        })
        console.log(token, email, '//////////////');
    }, [token, email])

    return (
        <>
            {isLoading ? <Processing /> : <NewPassword email={email} />}

        </>
    )
}

export default Verification