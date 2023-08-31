import React from 'react'
import api from '../../services/api'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EditPost } from '../../Components';
export const PostMoreMenu = ({ post, setMore, user }) => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [reportMenu, setReportMenu] = useState(false)
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()
    const deleteHandle = () => {
        api.postDelete(post.id).then((response) => {
            if (response.data.success) {
                navigate(`/${post.username}`)
            }

        }).catch((err) => {
            console.log(err);

        })
    }

    const cancelHandle = () => {

    }

    const handleSubmitReport = (event: React.FormEvent) => {
        event.preventDefault();
        api.postReport({ type: selectedType, id: post.id }).then((response) => {
            if (response.data.success) {
                setMore(false)
            }
        }).catch((err) => {
            console.log(err);

        })
        // Handle submitting the report with the selectedType
        console.log('Selected Type:', selectedType);
    };

    return (
        <div className='  absolute  flex'>
            {user ? (<div className='w-[400px] gap-2 max-h-[calc(100%-40px)] border rounded-md b bg-white'>
                <div className='flex-col flex rounded-lg'>
                    <button onClick={deleteHandle} className='border min-h-[48px] text-red-600 font-mono font-extrabold cursor-pointer'>Delete</button>
                    <button onClick={()=>setEdit(!edit)} className='border min-h-[48px] cursor-pointer'>Edit</button>
                    <button onClick={() => setMore(false)} className='border min-h-[48px] cursor-pointer'>Cancel</button>
                </div>
            </div>) : (<div className='w-[400px] gap-2 max-h-[calc(100%-40px)] border rounded-md b bg-white'>
                <div className='flex-col flex rounded-lg'>
                    <button onClick={() => setReportMenu(!reportMenu)} className='border min-h-[48px] text-red-600 font-mono font-extrabold cursor-pointer'>Report</button>
                    <button onClick={() => setMore(false)} className='border min-h-[48px] cursor-pointer'>Cancel</button>
                </div>
                {reportMenu && <div className="p-4 bg-white  absolute space-y-4">
                    <h2 className="text-xl font-bold">Report Menu</h2>
                    <form onSubmit={handleSubmitReport} className="space-y-2">
                        <div>
                            <label htmlFor="reportType" className="block font-semibold">
                                Select Report Type:
                            </label>
                            <select
                                id="reportType"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="block w-full py-2 px-3 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            >
                                <option value="">Select...</option>
                                <option value="scamOrFraud">Scam or fraud</option>
                                <option value="spam">it's spam</option>
                                <option value="violenceOrDangerous">Violence or dangerous organizations</option>
                                <option value="suicideOrSelfInjury">SuideOrSelfInjury</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            hidden={!selectedType}

                        >
                            Submit
                        </button>
                    </form>
                </div>}
            </div>

            )}
            {edit && <EditPost postId={post.id} setEdit={setEdit} edit={edit} />}
        </div>
    )
}

export default PostMoreMenu