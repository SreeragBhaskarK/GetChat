import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../services/api";
import { SuccessModal } from "../../Components";

export const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    phoneOrusernameOremail: '',
  })

  const [success, setSuccess] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setFormData((preFormData) => ({
      ...preFormData,
      [name]: value
    }))
  }
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    phoneOrusernameOremail: '', error: ''
  });


  const validateForm = () => {
    const errors = { phoneOrusernameOremail: '', error: '' };
    let returnData = true
    // Validate the 'phoneOrusernameOremail' field
    if (!formData.phoneOrusernameOremail) {
      errors.phoneOrusernameOremail = "Please enter a phone number, username, or email.";
      returnData=false
    }


    setErrors(errors);

    return returnData; // Return true if there are no errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = await validateForm();
    console.log(isValid,'///////');
    
    if (isValid) {
      api.forgotPasswordUser(formData).then((response) => {
        console.log(response);
        
        if (response.data.message === 'OTP sent successfully.') {
          navigate('/otp-verification', { state: { phone: formData.phoneOrusernameOremail } })
        } else {
          setSuccess(true)
        }
      })
        .catch((err: any) => {
          console.log(err,'err');
          /* onsole.log(error,'error');
          const error = errors.error=err.response.data.message
          
          setErrors(error) */
        })
    }
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
            Trouble logging in?
          </h2>
          <br />
          <p >Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="phoneOrusernameOremail" className="block text-sm font-medium leading-6 text-gray-900">
                Phone number, username, or email
              </label>
              <div className="mt-2">
                <input
                  id="phoneOrusernameOremail"
                  name="phoneOrusernameOremail"
                  type="text"
                  autoComplete="phone email username"

                  onChange={handleChange}
                  value={formData.phoneOrusernameOremail}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {errors?.phoneOrusernameOremail && <p className="text-red-500 text-sm mt-1">{errors.phoneOrusernameOremail}</p>}
                {errors?.error && <p className="text-red-500 text-sm mt-1">{errors.error}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send login link
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <SuccessModal success={success} setSuccess={setSuccess} />
    </div>

  )
}

export default ForgotPassword