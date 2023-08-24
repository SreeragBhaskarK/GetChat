import React, { useState } from 'react';



import { useSelector, useDispatch } from 'react-redux';
import api from '../services/api';
import { addPost } from '../redux/userSlice';


export const Uploader = ({ upload, setUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formDataPost, setformData] = useState({
        caption: ''
    })
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
        console.log('////////');


        console.log(selectedFile);

        /*    const userId = useSelector((state: any) => state.user.userData._id) */

        /*   formData.append('userId', userId); */
        if (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/')) {


            let postName = selectedFile.name.replace(/[^a-zA-Z0-9\s]/g, '')
            const formData = {
                originalname: postName.replace(/\s/g, ''),
                mimetype: selectedFile.type,
                type: 'post'
            }
            console.log('////////uploader', formData);
            api.postUpload(formData).then(async (response) => {
                console.log(response, '/////image', userData);
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
                        console.log('//////cors');
                        const parsedUrl = new URL(result.url);
                        console.log(parsedUrl, 'parsedUrl');
                        const postUrl = parsedUrl.origin + parsedUrl.pathname
                        console.log(postUrl, 'posturl');

                        const formData = {
                            url: postUrl,
                            username: userData.username,
                            caption: formDataPost.caption
                        }

                        api.postUrl(formData).then((response) => {
                            console.log(response);

                            if (response.data.success) {

                                setUpload(false)
                                dispatch(addPost(response.data.data))

                            }
                        }).catch((err) => {
                            setUpload(false)
                            console.log(err, 'errrrorr');

                        })
                    }

                    console.log('Image uploaded successfully', result);
                }

            }).catch((err) => {
                console.log('//////', err);

            })
            // You might need to adjust the endpoint URL
        } else {
            return
        }
    };

    return (
        <>
            {upload && (
                <div className="fixed top-0 left-0 right-0 z-50 m-auto w-fit p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
                            <div className="p-6 space-y-6">
                                <div>
                                    <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
                                    <input type="text" name='caption' value={formDataPost.caption} placeholder='caption' onChange={handleFileChange} />

                                    <button className='bg-blue-400' onClick={handleImageUpload}>submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Uploader;
