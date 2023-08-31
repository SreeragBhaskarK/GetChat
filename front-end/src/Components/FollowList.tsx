import { Link } from "react-router-dom";
import api from "../services/api"
import { useEffect, useState } from 'react'



export const FollowList = ({ setFollow, follow, userId, type }) => {
    const [followData, setFollowData] = useState([])
    console.log(type,'///////tyep',userId);
    
    useEffect(() => {
        api.getFollowData({ userId, type }).then((response) => {
            console.log(response,'/////folllow');
            
            if (response.data.success){
                setFollowData(response.data.data)
            }
      }).catch((err) => {
                console.log(err);
            })
    }, [followData])

    return (
        <>
            <div className="relative w-full mx-auto max-w-md max-h-full">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={()=>setFollow(!follow)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                            {type}
                        </h3>
                    </div>

                    <div className="p-6">
                        <ul className="my-4 space-y-3">
                            {followData.map((follow) => {
                                return (

                                    <li>
                                        <Link to={`/${follow.username}`} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                            <img className="w-4" src={follow.profile_pic}/>
                                            <span className="flex-1 ml-3 whitespace-nowrap">{follow.username}</span>
                                            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">{type == 'following' ? 'following' : 'remove'}</span>
                                        </Link>
                                    </li>
                                )
                            })

                            }
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowList