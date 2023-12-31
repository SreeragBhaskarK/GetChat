import { useEffect, useState } from 'react'
import api from '../../services/api'
import { NavTopBar, NavSideBar, Footer } from '../../widgets/layout/admin';
import { DeleteModal, EditAudienceAdmin } from '../../Components'
export const Audience = () => {
  interface Audience {
    user_id: string;
    username: string;
    email: string;
    phone: string;
    // Add other properties if necessary
  }

  const [editProfile, setEditProfile] = useState(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [deleteIndex, setDeleteIndex] = useState()
  const [audiences, setAudiences] = useState<Audience[]>([])
  const [audienceDetail, setAudienceDetail] = useState({
    userId: '',
    postId: ''
  })
  useEffect(() => {


    api.getAudienceAdmin().then((response) => {
      if (response.data.success) {
        console.log(response, '/////////');

        setAudiences(response.data.data)
      }
    }).catch((err) => {
      console.log(err, 'eeeeeeeeeeeeeeee')
    })
  }, [])



  const handleDelete = (index) => {
    setDeleteModal(!deleteModal)
    setDeleteIndex(index)
  }

  const handleEdit = (index) => {
    setEditProfile(!editProfile)
    setDeleteIndex(index)
  }

  const handleStatusChange = (e, userId) => {
    const { value } = e.target

    api.updateUserStatus({ userId: userId, status: value }).then((response) => {
    

      if (response.data.success) {
        setAudiences((prevAudience) => prevAudience.map((user:any) => {
          if (user.user_id == userId) {
            return { ...user, status: value };
          }
          return user
        }))
      }

    }).catch((err) => {
      console.log(err);

    })


  }


  return (
    <>
      <NavSideBar />
      <main className="ease-soft-in-out ml-40  xl:ml-[17rem] relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
        <NavTopBar navLocation='Audience' />
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-full max-w-full px-3">
              <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                {/*  <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <h6>Audience</h6>
            </div> */}

                <div className="flex-auto px-0 pt-0 pb-2">
                  <div className="p-0 overflow-x-auto">
                    <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                      <thead className="align-bottom">
                        <tr>
                          <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">No.</th>
                          <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Id</th>
                          <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Username</th>
                          <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Phone / Email</th>
                          <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Followers</th>
                          <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                          <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {audiences && audiences.map((audience: any, index) => {

                          return (
                            <tr key={index}>
                              <td className="px-6">
                                {index + 1}
                              </td>
                              <td className="px-6">
                                #{audience?.user_id}
                              </td>

                              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <div className="flex px-2 py-1">
                                  <div>
                                    <img src={audience?.profile_pic} className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl" alt="user1" />
                                  </div>
                                  <div className="flex flex-col justify-center">
                                    <h6 className="mb-0 text-sm leading-normal">{audience?.username}</h6>

                                  </div>
                                </div>
                              </td>

                              <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span className="text-xs font-semibold leading-tight text-slate-400">{audience?.email ?? audience?.phone}</span>
                              </td>
                              <td>

                              </td>
                              <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span className={`bg-gradient-to-tl px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white ${audience.status === 'processing' ? 'from-yellow-600 to-lime-400' :
                                  audience.status === 'active' ? 'from-green-600 to-lime-400' :
                                    audience.status === 'block' ? 'from-red-600 to-lime-400' : ''
                                  }`}>
                                  {audience?.status}
                                </span>


                              </td>
                              <td className="px-6 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <div className='flex justify-center'>

                                  <a onClick={() => handleEdit(index)} className="text-xs flex items-center mx-2 font-semibold leading-tight text-slate-400"> Edit </a>
                                  <a onClick={() => handleDelete(index)} className="text-xs flex items-center mx-2 font-semibold leading-tight text-slate-400"> Delete </a>
                                  <div className="w-32 ml-5">
                                    <select onChange={(e) => handleStatusChange(e, audience.user_id)} name='type' defaultValue={audience.status} className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                      <option className='text-red-500' value='block'>block</option>
                                      <option className='text-green-500' value='active'>active</option>
                                      <option className='text-yellow-500' value='processing'>processing</option>

                                    </select>
                                  </div>
                                </div>
                                {deleteModal && deleteIndex == index && <DeleteModal setItems={setAudiences} items={audiences} deleteItem={audience} deleteModal={deleteModal} setDeleteModal={setDeleteModal} type={'user'} />}
                                {editProfile && deleteIndex == index && < EditAudienceAdmin editProfile={editProfile} userData={audience} setEditProfile={setEditProfile} />}

                              </td>
                            </tr>)
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
        <Footer />
      </main >
    </>
  )
}

export default Audience