import React, { useState } from 'react';
import { ImageCrop } from './ImageCrop';
import ReactCrop, { Crop } from 'react-image-crop';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Uploader = ({ upload, setUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    interface CustomCrop {
        unit?: string;
        width?: number;
        height?: number;
        aspect?: number;
        x?: number;
        y?: number
    }
    const [crop, setCrop] = useState<CustomCrop | null>(null); // Use CustomCrop type // Crop object, you can define Crop type as per your needs

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleImageUpload = async () => {
       /*  if (!selectedFile || !crop) return; */
       console.log('////////uploader');
       
        const userId = useSelector((state: any) => state.user.userData._id)
        const formData = new FormData();
        formData.append('img', selectedFile);
        formData.append('userId', userId);
        axios.post('http://localhost:3002/api/v1/post/posts',formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((response)=>{
            console.log(response,'/////image');
            
        }).catch((err)=>{   
            console.log(err);
            
        })
        // You might need to adjust the endpoint URL
        
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
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                    {selectedFile && (
                                        <ImageCrop imageFile={selectedFile} crop={crop} setCrop={setCrop} />
                                    )}
                                    <button onClick={handleImageUpload}>Upload Image</button>
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
