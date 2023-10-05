import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; // Choose a theme that fits your app
import api from '../services/api';



export const AddAdvertising = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null)
    const [today, setToday] = useState(new Date())
    const [formData, setFormData] = useState({
        adName: '',
        publishedDate: new Date(),
        placedArea: 'homePage',
        adUrl:'https://blog.fractionalcmo.io/hs-fs/hubfs/Moz_Facebook_ad.png?width=473&name=Moz_Facebook_ad.png'

    })
    const [errors, setErrors] = useState({
        adName: '',
        publishedDate: '',
        placedArea: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value


        }))
    }

    const validateForm = () => {
        const error = {
            adName: '',
            publishedDate: '',
            placedArea: ''
        };
        let returnData = true

        if (!formData.adName) {
            error.adName = "Please enter a ad name.";
            returnData = false
        }

        if (!formData.publishedDate) {
            error.publishedDate = "Please enter a published date.";
            returnData = false
        }

        if (!formData.placedArea) {
            error.placedArea = "Please enter a placed area.";
            returnData = false
        }

        setErrors(error);

        return returnData // Return true if there are no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        
        const isValid = await validateForm()
        if (isValid) {
            api.addAdvertising(formData).then((response) => {
      
                if (response.data.success) {
                    setOpen(false)
                }

            }).catch((err) => {
                console.log(err);

            })
        }
    }


    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div>
                                        <form onSubmit={(e) => handleSubmit(e)}>

                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="">
                                                    {/*  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div> */}
                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                            Add Advertising
                                                        </Dialog.Title>
                                                        <div className="mt-2">


                                                            <div className='flex items-start'>
                                                                <div>
                                                                    <label htmlFor="adName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ad Name</label>
                                                                    <input type="text" onChange={(e) => handleChange(e)} value={formData.adName} name="adName" id="adName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="new bike ktm rc" required />
                                                                </div>
                                                            </div>
                                                         {/*    <div className=''>
                                                                <div>

                                                                    <label htmlFor="publishedDate" id='publishedDate' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Published Date</label>
                                                                    <Flatpickr
                                                                        id='publishedDate'
                                                                        name='publishedDate'
                                                                        data-enable-time={false} // You can enable time if needed
                                                                        placeholder="Please select a date"
                                                                        options={{
                                                                            altInput: true, // Enable an alternate input field (for mobile compatibility)
                                                                            minDate: today, // Set the minimum date to today
                                                                        }}
                                                                        value={formData.publishedDate} // Provide the initial date value or use state to manage it
                                                                        onChange={(date)=>setFormData((prevForm)=>({...prevForm,publishedDate:date[0].toISOString()}))}
                                                                      
                                                                    />
                                                                </div>
                                                            </div> */}

                                                            <label htmlFor="placedArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Placed Area</label>
                                                            <select name='placedArea' onChange={(e) => handleChange(e)} value={formData.placedArea} id='placedArea'>
                                                                <option selected value='homePage'>Home Page</option>
                                                                <option value='explorePage'>Explore Page</option>
                                                            </select>



                                                            <div className="fallback  dropzone focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-border px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none">
                                                                <input name="file" type="file" placeholder='add Advertise item' />
                                                            </div>

                                                            <img src="" alt="" />





                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto"
                                                   
                                                >
                                                    Submit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() => setOpen(false)}
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default AddAdvertising