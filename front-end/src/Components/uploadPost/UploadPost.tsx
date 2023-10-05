import React, { useState, useCallback, Fragment } from 'react'
import { TypeCaptionPage, UploadPage } from '.';
import ImageCropPage from './ImageCropPage';
import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/userSlice';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify'
import { Processing } from '../../widgets/shimmerEffects';

export const UploadPost = ({ upload, setUpload }) => {

    const [step, setStep] = useState(1);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
    const [caption, setCaption] = useState('');
    const [tags, setTags] = useState('');
    const userData = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch()
    const nextStep = () => {
        setStep(step + 1);
    };

    const [isLoading, setIsLoading] = useState(false)

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleFileSelect = useCallback((file: File) => {


        setSelectedFile(file);
        nextStep();
    }, []);

    const handleCropComplete = useCallback(async (croppedImage: Blob | any) => {


        if (croppedImage) {

            setStep((prevStep) => prevStep + 1)
            setCroppedImage(croppedImage);
        }
    }, []);

    const handlePostSubmit = () => {
        // Handle the submission of the cropped image, caption, and tags here
        // You can use a backend API to upload the image and save the data
        setIsLoading(true)
        if (croppedImage.type.startsWith('image/') && selectedFile) {


            let postName = selectedFile.name.replace(/[^a-zA-Z0-9\s]/g, '')
            const formData = {
                originalname: postName.replace(/\s/g, ''),
                mimetype: croppedImage.type,
                type: 'post'
            }

            api.postUpload(formData).then(async (response) => {
           
                if (response.data.success) {
                    const preSignedUrl = response.data.data;

                    const result = await fetch(preSignedUrl, {
                        method: 'PUT',
                        body: croppedImage,
                        headers: {
                            'Content-Type': croppedImage.type, // Adjust the content type as needed
                        },
                    });
                    console.log(result);

                    if (result.status == 200) {

                        const parsedUrl = new URL(result.url);

                        const postUrl = parsedUrl.origin + parsedUrl.pathname


                        const formData = {
                            url: postUrl,
                            username: userData.username,
                            caption: caption
                        }

                        api.postUrl(formData).then((response) => {
                            console.log(response);
                            setIsLoading(false)
                            if (response.data.success) {

                                setUpload(false)
                                dispatch(addPost(response.data.data))
                                toast.success('successfully uploaded post', {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });

                                setUpload(false)
                                setStep(1)
                                setTags('')
                                setCaption('')
                                setCroppedImage(null)
                                setSelectedFile(null)

                            }
                        }).catch((err) => {
                            setUpload(false)
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
                            } else {
                                setIsLoading(false)
                                setUpload(false)
                                setStep(1)
                                setTags('')
                                setCaption('')
                                setCroppedImage(null)
                                setSelectedFile(null)

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
                                // You might need to adjust the endpoint URL
                            }

                        })
                    }


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
                    // You might need to adjust the endpoint URL
                }
            })
        }
    }
    const handleClear = () => {
        setUpload(false)
        setStep(1)
        setTags('')
        setCaption('')
        setCroppedImage(null)
        setSelectedFile(null)
    }
    return (
        <>

            <Transition.Root show={upload} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleClear}>
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
                                    <Dialog.Panel className="pointer-events-auto relative w-full items-center flex overflow-auto no-scrollbar h-full max-w-md">
                                        <div className="bg-gray-100 rounded-2xl flex items-center justify-center">
                                            {isLoading && <Processing />}
                                            <div className="bg-white p-6 rounded shadow-md w-96">
                                                <h1 className="text-2xl font-semibold mb-4">Create Post</h1>
                                                {step === 1 && (
                                                    <UploadPage onFileSelect={handleFileSelect} />
                                                )}
                                                {step === 2 && (
                                                    <ImageCropPage
                                                        src={URL.createObjectURL(selectedFile!)}
                                                        onCropComplete={handleCropComplete}
                                                        onBack={prevStep}
                                                    />
                                                )}
                                                {step === 3 && (
                                                    <TypeCaptionPage
                                                        onPostSubmit={handlePostSubmit}
                                                        onBack={prevStep}
                                                        caption={caption}
                                                        tags={tags}
                                                        setCaption={setCaption}
                                                        setTags={setTags}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog >
            </Transition.Root >
        </>
    )
}

export default UploadPost