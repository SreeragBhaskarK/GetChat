import React from 'react'
import { NavRightSide, NavSideBar } from '../../widgets/layout/user'



export const EditProfile = () => {
  return (
    <>
      <NavSideBar />
      <main className="ease-soft-in-out xl:ml-68.5 xl:mr-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
        <div className='w-full mt-7' >
          <div className='container'>
            <div className='min-h-screen bg-gray-100'>
              <div>
                <h1 className='font-bold'>Settings</h1>
              </div>
              <div className='flex justify-around'>
                <ul className=''>
                  <li>Edit Profile</li>
                </ul>
                <div className=" ">
                  <div className="bg-white p-8 rounded-md shadow-md w-96">
                    <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                    <form>
                      <div className="mb-4">
                        <label htmlFor="profilePicture" className="block font-medium mb-1">
                          Profile Picture
                        </label>
                        <div className='flex flex-row items-center gap-4'>
                          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'
                            className='h-10 w-10 rounded-full object-cover' />
                          <label htmlFor="profilePicture" className="cursor-pointer text-cyan-500">
                            Change Profile Photo
                          </label>
                          <input
                            type="file"
                            id="profilePicture"
                            className="w-full hidden border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                          />
                        </div>

                      </div>
                      <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-1">
                          User Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="bio" className="block font-medium mb-1">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows={4}
                          className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-1">
                          Gender
                          
                        </label>
                        <select>
                       
                          id="name"
                          className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                          <option value='male'>male</option>
                          <option value='female'>female</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>

  )
}
export default EditProfile