import React, { useEffect, useState } from 'react'
import { NavSideBar } from '../../widgets/layout/user'
import { ViewPost } from '../../Components'
import { Link } from 'react-router-dom'
import { HiSquares2X2 } from 'react-icons/hi2'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../services/api'
import { addUserData } from '../../redux/userSlice'


export const Profile = () => {

  const userData = useSelector((state: any) => state.user.userData)
  const [likedBy, setLikedBy] = useState(false)

  const [postClick, setPostClick] = useState<boolean>(false)
  const [indexPost, setIndexPost] = useState()
  const [postData, setPostData] = useState([])

 
  const handlePostView = async (index, likedByUsername) => {
    console.log(index, '/////index');

    console.log(likedByUsername, '////////');
    await setLikedBy(likedByUsername.some((username)=> username ==userData.username))


    console.log('///////', likedBy);

    setIndexPost(index)
    setPostClick(true)
    console.log(indexPost);


  }

  useEffect(()=>{
    api.getPost(1,userData.username).then((response)=>{
      console.log(response);
      
      if(response.data.success){
        setPostData(response.data.data)
      }
    }).catch((err)=>{
      console.log(err);
    })
  },[userData])
  return (

    <>
      <NavSideBar />

      <main className="ease-soft-in-out xl:ml-68.5  relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
        <div className='w-full mt-7' >
          <div className='container'>
            <header className="flex flex-wrap items-center p-4 md:py-8">

              <div className="md:w-3/12 md:ml-16">

                <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
               border-2 border-pink-600 p-1" src={userData.profile_pic??'https://www.bytewebster.com/img/logo.png'} alt="profile" />
              </div>


              <div className="w-8/12 md:w-7/12 ml-4">
                <div className="md:flex md:flex-wrap md:items-center mb-4">
                  <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                    {userData.username}
                  </h2>


                  <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                         relative mr-6  text-xl transform -translate-y-2" aria-hidden="true">
                    <i className="fas fa-check text-white text-xs absolute inset-x-0
                         ml-1 mt-px"></i>
                  </span>


                  <Link to='/edit-profile' className="bg-blue-500 px-2 py-1 
                  text-white font-semibold text-sm rounded  text-center 
                  sm:inline-block block">Edit</Link>
                </div>


                <ul className="hidden md:flex space-x-8 mb-4">
                  <li>
                    <span className="font-semibold">{userData.posts.length}</span>
                    posts
                  </li>

                  <li>
                    <span className="font-semibold">50.5k</span>
                    followers
                  </li>
                  <li>
                    <span className="font-semibold">10</span>
                    following
                  </li>
                </ul>


                <div className="hidden md:block">
                  <h1 className="font-semibold">{userData.full_name}</h1>
                 {/*  <span className="bioclass">Internet company</span> */}
                  <p>{userData.bio}</p>
                 {/*  <span><strong>www.bytewebster.com</strong></span> */}
                </div>

              </div>

              <div className="md:hidden text-sm my-2">
                <h1 className="font-semibold">{userData.full_name}</h1>
              {/*   <span className="bioclass">Internet company</span> */}
                <p>{userData.bio}</p>
             {/*    <span><strong>www.bytewebster.com</strong></span> */}
              </div>

            </header>
            <div className="px-px md:px-3">


              <ul className="flex md:hidden justify-around space-x-8 border-t 
          text-center p-2 text-gray-600 leading-snug text-sm">
                <li>
                  <span className="font-semibold text-gray-800 block">6</span>
                  posts
                </li>

                <li>
                  <span className="font-semibold text-gray-800 block">50.5k</span>
                  followers
                </li>
                <li>
                  <span className="font-semibold text-gray-800 block">10</span>
                  following
                </li>
              </ul>
              <br />
              <br />

              <ul className="flex items-center justify-around md:justify-center space-x-12  
              uppercase tracking-widest font-semibold text-xs text-gray-600
              border-t">

                <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                  <a className="inline-block p-3" href="#">
                    <HiSquares2X2 className='text-xl w-fit md:text-xs' />
                    <span className="hidden md:inline">post</span>
                  </a>
                </li>
                <li>
                  <a className="inline-block p-3" href="#">
                    <i className="far fa-square text-xl md:text-xs"></i>
                    <span className="hidden md:inline">videos</span>
                  </a>
                </li>
                <li>
                  <a className="inline-block p-3" href="#">
                    <i className="fas fa-user border border-gray-500
                       px-1 pt-1 rounded text-xl md:text-xs"></i>
                    <span className="hidden md:inline">tagged</span>
                  </a>
                </li>
              </ul>

              <div className="flex flex-wrap -mx-px md:-mx-3">

                {postData.map((post, index) => {
                  return (
                    <div key={index} className="w-1/3 p-px md:px-3">

                      <a onClick={() => handlePostView(index, post.likedBy)}>
                        <article className="post bg-gray-100 text-white relative pb-full md:mb-6">

                          <img className="w-full h-full absolute left-0 top-0 object-cover" src={post.post_url} alt="image" />

                          <i className="fas fa-square absolute right-0 top-0 m-1"></i>

                          <div className="overlay hidden hover:block bg-gray-800 bg-opacity-25 w-full h-full absolute 
                          left-0 top-0 ">
                            <div className="flex justify-center items-center 
                              space-x-4 h-full">
                              <span className="p-2">
                                <i className="fas fa-heart"></i>
                                412K
                              </span>

                              <span className="p-2">
                                <i className="fas fa-comment"></i>
                                2,909
                              </span>
                            </div>
                          </div>

                        </article>
                      </a>
                      {postClick && indexPost == index && (<ViewPost  post={post} postClick={postClick}  username={userData.username}   setPostClick={setPostClick}   likedBy={likedBy} />)}
                    </div>

                  )
                })
                }


              </div>
            </div>

          </div>
        </div>

      </main>


    </>
  )
}

export default Profile