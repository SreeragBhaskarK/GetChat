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
  const [audiences, setAudiences] = useState<Audience[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [audienceDetail, setAudienceDetail] = useState({
    userId:'',
    postId:''
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

  if(deleteConfirm && audienceDetail.userId && audienceDetail.postId){
    setDeleteModal(true)
    api.deleteAudienceAdmin(audienceDetail).then((response)=>{

    })
  }

  return (
    <>
      <NavSideBar />
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
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
                        {audiences && audiences.map((audience, index) => {

                          return (
                            <tr>
                              <td className="px-6">
                                {index + 1}
                              </td>
                              <td className="px-6">
                                #{audience?.user_id}
                              </td>

                              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <div className="flex px-2 py-1">
                                  <div>
                                    <img src="../assets/img/team-2.jpg" className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl" alt="user1" />
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
                                <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">Online</span>
                              </td>
                              <td className="px-6 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <div className='flex justify-center'>

                                  <a onClick={() => setEditProfile(!editProfile)} className="text-xs mx-2 font-semibold leading-tight text-slate-400"> Edit </a>
                                  <a onClick={() => setDeleteModal(!deleteModal)} className="text-xs mx-2 font-semibold leading-tight text-slate-400"> Delete </a>
                                </div>
                                <DeleteModal deleteItem='Post' deleteModal={deleteModal} setDelete={setDeleteConfirm}  setDeleteModal={setDeleteModal} />

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
      < EditAudienceAdmin editProfile={editProfile} setEditProfile={setEditProfile} />
    </>
  )
}

export default Audience