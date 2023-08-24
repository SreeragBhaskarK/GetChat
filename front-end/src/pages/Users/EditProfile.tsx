import React, { useState } from 'react'
import { NavRightSide, NavSideBar } from '../../widgets/layout/user'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { addUserData } from '../../redux/userSlice'



export const EditProfile = () => {
  const userData = useSelector((state: any) => state.user.userData)
  const [onChange, setOnChange] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [profilePic, setProfilePic] = useState<Blob>()
  const [formData, setFormData] = useState({
    gender: userData.gender,
    bio: userData.bio,
    username: userData.username,
    profilePic:''
  })

  const handleChange = (e) => {
    setOnChange(true)
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let proPicName = profilePic.name.replace(/[^a-zA-Z0-9\s]/g, '')


    console.log(profilePic, '/////////');
   const proPic = {
      originalname: proPicName.replace(/\s/g, ''),
      mimetype: profilePic.type,
      type:'profile'
    }
    api.postUpload(proPic).then(async(response) => {
      console.log(response, '//////////');

      if (response.data.success) {
        const preSignedUrl = response.data.data;

        const result = await fetch(preSignedUrl, {
            method: 'PUT',
            body: profilePic,
            headers: {
                'Content-Type': profilePic.type, // Adjust the content type as needed
            },
        });
        console.log(result);

        if (result.status == 200) {
          const parsedUrl = new URL(result.url);
          const postUrl = parsedUrl.origin+parsedUrl.pathname
          console.log(postUrl,'posturl');
          formData.profilePic=postUrl
          api.updateProfile(formData).then((response)=>{
            if(response.data.success){
              dispatch(addUserData(response.data.data))
              navigate('/profile')
            }
          })
        }
      }
    }).catch((err) => {
      console.log(err);

    })


  }
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
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="profilePicture" className="block font-medium mb-1">
                          Profile Picture
                        </label>
                        <div className='flex flex-row items-center gap-4'>
                          <img src={profilePic ? URL.createObjectURL(profilePic) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'}
                            className='h-10 w-10 rounded-full object-cover' />
                          <label htmlFor="profilePicture" className="cursor-pointer text-cyan-500">
                            Change Profile Photo
                          </label>
                          <input
                            type="file"
                            id="profilePicture"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                            className="w-full hidden border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                          />
                        </div>

                      </div>
                      <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-1">
                          User Name
                        </label>
                        <input
                          disabled
                          value={userData.username}

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
                          onChange={handleChange}
                          value={formData.bio}
                          name='bio'
                          className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-1">
                          Gender

                        </label>
                        <select
                          id="name"
                          onChange={handleChange} name='gender'
                          className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500">
                          <option selected={formData.gender == 'male'} value='male'>male</option>
                          <option selected={formData.gender == 'female'} value='female'>female</option>
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