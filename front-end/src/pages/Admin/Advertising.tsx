import React, { useState, useEffect } from 'react'
import { Footer, NavSideBar, NavTopBar } from '../../widgets/layout/admin'
import { ImPlus } from 'react-icons/im'
import { AddAdvertising, DeleteModal, EditAdvertising } from '../../Components'
import api from '../../services/api'



const Advertising = () => {
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [advertises, setAdvertises] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [data, setData] = useState({})
    const [deleteModel, setDeleteModel] = useState(false)
    const [deleteItem, setDeleteItem] = useState(false)
    useEffect(() => {
        api.getAdvertising().then((response) => {
            console.log(response);
            if (response.data.success) {
                setAdvertises(response.data.data)
            }

        })
    }, [])

    const handleEdit = (data) => {
        setData(data)
    }

    const handleDelete = (id) =>{
        setDeleteItem(id)
    }
    return (
        <>
            <NavSideBar />
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
                <NavTopBar navLocation='Advertising' />
                <div className='w-full flex justify-end '>

                    <button type="button" onClick={() => setOpen(!open)} className="mr-6 flex inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">
                        <ImPlus className='mt-[2px]' /> &nbsp;&nbsp;&nbsp;&nbsp;<span> Add Ads</span> </button>
                </div>

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
                                                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Ad Id</th>
                                                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Ad name</th>
                                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Placed Area</th>
                                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Publish Date</th>
                                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                                                    <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {advertises.map((ad, index) => {
                                                    return (

                                                        <tr >
                                                            <td className="px-6">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6">
                                                                #{ad.id}
                                                            </td>

                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2 py-1">
                                                                    <div>
                                                                        <img src={ad.ad_url} className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl" alt="user1" />
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 text-sm leading-normal">{ad.ad_name}</h6>

                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <span className="text-xs font-semibold leading-tight text-slate-400">{ad.placed_area}</span>
                                                            </td>
                                                            <td>
                                                                {new Date(ad.published_date).toLocaleDateString()}


                                                            </td>
                                                            <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                {ad.published_data >= currentDate ? (<span className='bg-gradient-to-tl  from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white'>active</span>) : (<span className='bg-gradient-to-tl  from-yellow-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white'>processing </span>)}
                                                            </td>
                                                            <td className="px-6 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className='flex justify-center'>
                                                                    <a onClick={() => { setEditOpen(!editOpen); handleEdit(ad) }} className="text-xs mx-2 font-semibold leading-tight text-slate-400"> Edit </a>
                                                                    <a onClick={()=>{setDeleteModel(!deleteModel);handleDelete(ad.id)}} className="text-xs mx-2 font-semibold leading-tight text-slate-400"> Delete </a>
                                                                </div>


                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                }
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
            <AddAdvertising open={open} setOpen={setOpen} />
            <EditAdvertising open={editOpen} setOpen={setEditOpen} data={data} />
            <DeleteModal setItems='' items='' deleteModal={deleteModel} setDeleteModal={setDeleteModel} deleteItem={deleteItem} type={'advertising'} />
        </>
    )
}

export default Advertising