import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from '../../services/api'

export const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        mobileOrEmail: '',
        fullName: '',
        username: '',
        password: ''
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        api.signupUser(formData).then((response) => {
            if (response.data.success) {
                navigate('/login')
            }
        })
            .catch((err: Error) => {
                console.log(err);

            })

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
                            <label htmlFor="mobileOrEmail" className="block text-sm font-medium leading-6 text-gray-900">
                                Mobile Number or Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="mobileOrEmail"
                                    name="mobileOrEmail"
                                    type="text"
                                    autoComplete="email phone"
                                    required
                                    value={formData.mobileOrEmail}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
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
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
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
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
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
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
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