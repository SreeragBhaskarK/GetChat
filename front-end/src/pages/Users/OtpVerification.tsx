
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useDispatch } from 'react-redux';
import userSlice, { addUserData, loginCheck } from '../../redux/userSlice'
import { toast } from 'react-toastify'
import { Processing } from '../../widgets/shimmerEffects';
export const OtpVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phone, setPhone] = useState('')
    const location = useLocation();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        const number = location.state?.phone
        if (!number) navigate('/login')
        setPhone(number)
        const firstTwo = number.substring(0, 2);
        const lastTwo = number.substring(number.length - 2);

        const hiddenPart = '*'.repeat(number.length - 4);

        setPhoneNumber(firstTwo + hiddenPart + lastTwo)
    }, [])
    const isValid = ()=>{
        let error = ''
        let valid = true
        if (!formData.otp1 || !formData.otp2 || !formData.otp3 || !formData.otp4) {
            error = 'Please enter 4 digit otp.'
            valid = false
        }
        setError(error)
        return valid
    }

    const handleForm = async (e) => {
        e.preventDefault()
        const validateForm = await isValid()
        if (validateForm) {
            setIsLoading(true)

            const otp = formData.otp1 + formData.otp2 + formData.otp3 + formData.otp4
            api.otpVerification({ otp: otp, phone: phone }).then((response) => {
                setIsLoading(false)
                console.log(response, '////////////');
                if (response.data.success) {
                    dispatch(loginCheck(true))
                    dispatch((addUserData(response.data.data)))
                    toast.success('successfully login', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate('/')

                }

            }).catch((err) => {
                setIsLoading(false)
                if (err.response.data.message) {

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
                    })
                    navigate('/login')
                }
                console.log(err, '///////e');

            })

        }
    }

    const handleChange = (e) => {
        console.log('/////////', e);

        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }


    return (
        <>

            <div>
                {isLoading && <Processing />}
                <div className="relative flex min-h-screen flex-col  justify-center overflow-hidden bg-gray-50 py-12">
                    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-semibold text-3xl">
                                    <p>OTP Verification</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-gray-400">
                                    <p>We have sent a code to your phone {phoneNumber}</p>
                                </div>
                            </div>

                            <div>
                                <form onSubmit={handleForm}>
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                            <div className="w-16 h-16 ">
                                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 " type="number" value={formData.otp1} name='otp1' onChange={handleChange} maxLength={1} min={0} id="" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" value={formData.otp2} name='otp2' onChange={handleChange} maxLength={1} min={0} id="" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" value={formData.otp3} name='otp3' onChange={handleChange} maxLength={1} min={0} id="" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" value={formData.otp4} name='otp4' onChange={handleChange} maxLength={1} min={0} id="" />
                                            </div>
                                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                                        </div>

                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                    Submit OTP
                                                </button>
                                            </div>

                                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OtpVerification