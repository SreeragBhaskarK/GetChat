import React, { useEffect, useState,memo } from 'react'
import api from '../../services/api'


export const WeekNotifications = () => {
    const [weekNotification, setWeekNotification] = useState([])
    useEffect(() => {

        api.getNotificationWeek().then((response) => {
            console.log(response,'notifications');
            if (response.data.success) {
                setWeekNotification(response.data.data)
            }

        }).catch((err) => {
            console.log(err);

        })

    }, [])

    return (
        <>
            <div className="w-full max-w-full h-[426px]  px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
                <div className="border-black/12.5  shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                    <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                        <h6>Notifications overview</h6>
                        <p className="leading-normal text-sm">
                            <i className="fa fa-arrow-up text-lime-500"></i>
                            <span className="font-semibold"></span> this week
                        </p>
                    </div>
                    <div className="flex-auto p-4 overflow-auto">
                        <div className="before:border-r-solid relative before:absolute before:top-0 before:left-4 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px">
                            {weekNotification.map((notificaion) => {
                                const months = [
                                    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                                    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                                  ];
                                  const inputDate = new Date(notificaion.createdAt);
                                  const day = inputDate.getDate();
                                  const month = months[inputDate.getMonth()];
                                  const hours = inputDate.getHours();
                                  const minutes = inputDate.getMinutes();
                                  const ampm = hours >= 12 ? "PM" : "AM";
                                  
                                  // Convert to 12-hour format
                                  const hours12 = hours % 12 || 12;
                                  
                                  const formattedDate = `${day} ${month} ${hours12}:${minutes} ${ampm}`;
                                return (
                                    <div className="relative mb-4 mt-0 after:clear-both after:table after:content-['']">

                                        <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                                            <i className="relative z-10 text-transparent ni leading-none ni-bell-55 leading-pro bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text fill-transparent"></i>
                                        </span>
                                        
                                        <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                                            <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">{notificaion.user_type}, {notificaion.message}</h6>
                                            <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">{formattedDate}</p>
                                        </div>
                                    </div>)
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(WeekNotifications) 