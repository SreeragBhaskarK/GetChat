import { isValid } from "date-fns"
import { Processing } from "../../widgets/shimmerEffects"
import { useEffect, useState } from 'react'
import api from "../../services/api"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
export const NewPassword = ({ email }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    email: email
  })
  const [error, setError] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const location = useLocation()
  const navigate = useNavigate()
  /*  useEffect(()=>{
     navigate({
       pathname:location.pathname
     })
   },[]) */
  const isValid = () => {
    const errors = {
      newPassword: '',
      confirmPassword: ''
    }
    let returnData = true
    if (!formData.newPassword) {
      errors.newPassword = 'Please enter a password.'
      returnData = false
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please enter a confirm password.'
      returnData = false
    }
    if (formData.newPassword && formData.confirmPassword && formData.confirmPassword != formData.newPassword) {
      errors.confirmPassword = 'Please check password and confirm password not match'
      returnData = false
    }


    setError(errors)

    return returnData
  }
  const handleSubmit =async (e) => {
    e.preventDefault()
    const validateForm = await isValid()
    if (validateForm) {
      setIsLoading(true)
      api.setNewPassword(formData).then((response) => {
        if (response.data.success) {
          setIsLoading(false)
          navigate('/login')
          toast.success('successfully set new password.', {
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

    }


  }
  return (
    <>
      {isLoading && <Processing />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="email"
                  required
                  onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, newPassword: e.target.value }))}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error?.newPassword && <p className="text-red-500 text-sm mt-1">{error.newPassword}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, confirmPassword: e.target.value }))}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error?.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default NewPassword
