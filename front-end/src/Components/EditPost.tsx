import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'



export const EditPost = ({postId,setEdit,edit}) => {
    const [formDataPost, setformData] = useState('')
    const navigate = useNavigate()
    const submitEdit = ()=>{
        if(formDataPost){

            api.editPost({id:postId,caption:formDataPost}).then((response)=>{
               
                if(response.data.success){
                    navigate(`/${response.data.data[0].username}`)
                    setEdit(!edit)
                }
                
                
            }).catch((err)=>{
                console.log(err);
                
            })
        }
    }
    return (
        <> <div className="fixed top-0 left-0 right-0 z-50 m-auto w-fit p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit Post
                        </h3>
                        <button
                            type="button"
                            onClick={() => setEdit(!edit)}
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
                            <input type="text" name='caption' value={formDataPost} placeholder='caption' onChange={(e)=>setformData(e.target.value)} />

                            <button className='bg-blue-400' onClick={()=>submitEdit()}>submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    )
}

export default EditPost