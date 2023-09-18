import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from '../../services/api'
import { toast } from "react-toastify"
import { Processing } from "../../widgets/shimmerEffects"
export const Signup = () => {
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const [otp, setOtp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        phoneOrEmail: '',
        fullName: '',
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        phoneOrEmail: '', password: '', fullName: '',
        username: ''
    });
    const validateForm = () => {

        const errors = { phoneOrEmail: '', password: '', fullName: '', username: '' };
        let returnData = true
        // Validate the 'phoneOrusernameOremail' field
        if (!formData.phoneOrEmail) {
            errors.phoneOrEmail = "Please enter a phone number or email.";
            returnData = false
        }

        // Validate the 'password' field
        if (!formData.password) {
            errors.password = "Please enter a password.";
            returnData = false
        }
        if (!formData.fullName) {
            errors.fullName = "Please enter a full name.";
            returnData = false
        }
        if (!formData.username) {
            errors.username = "Please enter a username.";
            returnData = false
        }

        setErrors(errors);


        return returnData// Return true if there are no errors
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = await validateForm();

        if (isValid) {
            setIsLoading(true)
            if (formData.phoneOrEmail && formData.fullName && formData.username && formData.password) {


                api.signupUser(formData).then((response) => {
                    console.log(response);
                    setIsLoading(false)
                    if (response.data.success) {

                        if (response.data.message === 'OTP sent successfully.') {
                            toast.info('Successfully send verification otp.', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            navigate('/otp-verification', { state: { phone: formData.phoneOrEmail } })
                        } else {

                            toast.info('Successfully send verification mail.', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            navigate('/login')
                        }
                    }
                })
                    .catch((err: any) => {
                        setIsLoading(false)
                        console.log(err,'////////');
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
                        }else{
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
                        }
                    })
            }

        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target as HTMLInputElement
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }
    return (
        <div>
           {isLoading&& <Processing/>}
            <div className="flex min-h-screen flex-1 flex-col items-center justify-center ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="phoneOrEmail" className="block text-sm font-medium leading-6 text-gray-900">
                                Mobile Number or Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phoneOrEmail"
                                    name="phoneOrEmail"
                                    type="text"
                                    autoComplete="email phone"

                                    value={formData.phoneOrEmail}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors?.phoneOrEmail && <p className="text-red-500 text-sm mt-1">{errors.phoneOrEmail}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    autoComplete="fullName"

                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors?.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"

                                    value={formData.username}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors?.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"

                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors?.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Have an account?{' '}
                        <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup