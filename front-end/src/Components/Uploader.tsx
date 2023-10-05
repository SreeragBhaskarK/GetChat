import React, { useState, Fragment, useRef } from 'react';



import { useSelector, useDispatch } from 'react-redux';
import api from '../services/api';
import { addPost } from '../redux/userSlice';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';


export const Uploader = ({ upload, setUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formDataPost, setformData] = useState({
        caption: ''
    })
    const fileRef = useRef(null)
    const userData = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch()
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }

        const { name, value } = event.target
        setformData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    };

    const handleImageUpload = async () => {
        /*  if (!selectedFile || !crop) return; */
     


      

        /*    const userId = useSelector((state: any) => state.user.userData._id) */

        /*   formData.append('userId', userId); */
        if (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/')) {


            let postName = selectedFile.name.replace(/[^a-zA-Z0-9\s]/g, '')
            const formData = {
                originalname: postName.replace(/\s/g, ''),
                mimetype: selectedFile.type,
                type: 'post'
            }
  
            api.postUpload(formData).then(async (response) => {
            
                if (response.data.success) {
                    const preSignedUrl = response.data.data;

                    const result = await fetch(preSignedUrl, {
                        method: 'PUT',
                        body: selectedFile,
                        headers: {
                            'Content-Type': selectedFile.type, // Adjust the content type as needed
                        },
                    });
                    console.log(result);

                    if (result.status == 200) {
                  
                        const parsedUrl = new URL(result.url);
         
                        const postUrl = parsedUrl.origin + parsedUrl.pathname
                     

                        const formData = {
                            url: postUrl,
                            username: userData.username,
                            caption: formDataPost.caption
                        }

                        api.postUrl(formData).then((response) => {
                           

                            if (response.data.success) {

                                setUpload(false)
                                dispatch(addPost(response.data.data))

                            }
                        }).catch((err) => {
                            setUpload(false)
                            console.log(err, 'errrrorr');

                        })
                    }

                  
                }

            }).catch((err) => {
                console.log('//////', err);

            })
            // You might need to adjust the endpoint URL
        } else {
            return
        }
    };

    const handleButtonClick = () => {
        fileRef.current.click();
    };

    return (
        <>
            <Transition.Root show={upload} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setUpload}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden ">
                        <div className="absolute flex justify-center inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 w-full h-full justify-center  items-center flex max-w-full ">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-y-full"
                                    enterTo="translate-y-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-y-0"
                                    leaveTo="translate-y-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-full items-center flex  h-full max-w-md">

                                        <div className=" z-50 w-fit p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(80%-1rem)] max-h-full  transition-opacity duration-500 ease-in-out">
                                            <div className="relative w-full h-full aspect-[1/1] max-w-3xl max-h-3xl">
                                                <div className="relative bg-white h-full rounded-lg shadow dark:bg-gray-700">
                                                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                            Create new post
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            onClick={() => setUpload(!upload)}
                                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            <svg
                                                                className="w-3 h-3"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                    </div>
                                                    <div className="h-full w-full justify-center items-center flex">
                                                        <div>
                                                            <input className='hidden ' type="file" accept="image/*,video/*" ref={fileRef} onChange={handleFileChange} />
                                                            {/* <input  type="text" name='caption' value={formDataPost.caption} placeholder='caption' onChange={handleFileChange} /> */}
                                                            <button onClick={handleButtonClick} className='bg-sky-400 rounded cursor-pointer p-2 text-white font-serif'>selected from post</button>
                                                            {/* <button className='bg-blue-400' onClick={handleImageUpload}>submit</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>


                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Uploader;
