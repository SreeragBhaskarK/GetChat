import React, { useEffect, useCallback, useState, useRef } from 'react'
import api from '../../services/api'
import { chart2 } from '../../assets/Admin/chart2'
export const UserOverview = () => {
    const [type, setType] = useState('month')
    const chartRef = useRef(null);
    useEffect(() => {
        testUserOverView(type)
    }, [type])

    const testUserOverView = useCallback(async (type) => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        var ctx2 = document.getElementById("chart-line")
        let test = ''
        if (type == 'month') {
            test = 'testMonth'
        } else if (type == 'week') {
            test = 'testWeek'

        } else if (type == 'year') {
            test = 'testYear'
        }
        chartRef.current = await chart2(ctx2, '', test)

        userOverView(type)
    }, [])

    const userOverView = useCallback((type) => {
        console.log(type);

        let target = ''
        if (type == 'month') {
            target = '2023'
        } else if (type == 'week') {
            target = 'week'

        } else if (type == 'year') {
            target = '6'
        }


        api.getUserDashboard(type, target).then(async (response) => {
            if (response.data.success) {
                console.log(response.data.data, '///////', type, target);
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                var ctx2 = document.getElementById("chart-line")
                chartRef.current = await chart2(ctx2, response.data.data, type)
            }
        }).catch((err) => {
            console.log(err);

        })

    }, [])
    return (
        <>
            <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
                <div className="border-black/12.5 shadow-soft-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                    <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                        <h6>Users overview</h6>
                      {/*   <p className="leading-normal text-sm">
                            <i className="fa fa-arrow-up text-lime-500"></i>
                            <span className="font-semibold">4% more</span> in 2021
                        </p> */}
                    </div>
                    <div className="w-full lg:w-11/12 flex  justify-end">
                        <select onChange={(e) => setType(e.target.value)} value={type} choices-select="month" name="userFilter">
                            <option value="month">Month</option>
                            <option value="week">Week</option>
                            <option value="year">Year</option>
                        </select>
                    </div>
                    <div className="flex-auto p-4">
                        <div>
                            <canvas id="chart-line" height="300"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOverview