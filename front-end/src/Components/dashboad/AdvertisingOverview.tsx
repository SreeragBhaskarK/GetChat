import React, { useEffect, useCallback, useRef, useState } from 'react'
import { chart1 } from '../../assets/Admin/chart1'
import { postSocket } from '../../services/socketIo'
import api from '../../services/api'


export const AdvertisingOverview = () => {
    const prevChart = useRef(null)
    const [type, setType] = useState('month')
    useEffect(() => {

        testUserOverView(type)
    }, [type])

    const testUserOverView = useCallback(async (type) => {
        if (prevChart.current) {
            prevChart.current.destroy();
        }
        const ctxReport = document.getElementById("chart-bars-post")
        let test = ''
        if (type == 'month') {
            test = 'testMonth'
        } else if (type == 'week') {
            test = 'testWeek'

        } else if (type == 'year') {
            test = 'testYear'
        }
        prevChart.current = await chart1(ctxReport, '', test)
        handleAdvertisingOverview(type)
    }, [])

    const handleAdvertisingOverview = useCallback(async (type) => {
        try {
            let target = ''
            if (type == 'month') {
                target = '2023'
            } else if (type == 'week') {
                target = 'week'
    
            } else if (type == 'year') {
                target = '6'
            }
            console.log(type,target , 'post');
            api.getAdvertisingDashboard(type, target).then(async(response)=>{
                console.log(response,'adddddddddddd');
                
                if(response.data.success){

                    if (prevChart.current) {
                        prevChart.current.destroy()
                    }
                    const ctxReport = document.getElementById("chart-bars-post")
                    prevChart.current = await chart1(ctxReport, response.data.data,type)
                }
            }).catch((err)=>{
                console.log(err,'error');
                
            })

            
        } catch (error) {
            console.log(error);

        }

    }, [])
    return (
        <>
            <div className="w-full max-w-full px-3 mt-3 mb-6 lg:mb-0 lg:w-5/12 lg:flex-none">
                <div className="border-black/12.5 shadow-soft-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                    <div className="flex-auto p-4">
                        <div className="py-4 pr-1 mb-4 bg-gradient-to-tl from-gray-900 to-slate-800 rounded-xl">
                            <div>
                                <canvas id="chart-bars-post" height="170"></canvas>
                            </div>
                        </div>

                        <h6 className="mt-6 mb-0 ml-2">Advertising Overview</h6>
                        {/* <p className="ml-2 leading-normal text-sm">(<span className="font-bold">+23%</span>) than last week</p> */}
                        <div className="w-full lg:w-11/12 flex  justify-end">
                            <select choices-select="month" onChange={(e) => setType(e.target.value)} name="postReportFilter">
                                <option value="month">Month</option>
                                <option value="week">Week</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdvertisingOverview