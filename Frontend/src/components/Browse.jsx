import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from '@/utils/endpoint';
import { Loader2 } from 'lucide-react';

export default function Browse() {

    let searchQuery = useSelector((state) => state.job.searchQuery);
    let allJobs = useSelector((state) => state.job.allJobs)
    let dispatch = useDispatch();
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        let fetchAllJobs = async (dispatch, searchQuery) => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (e) {
                console.error("Error fetching jobs:", e);
            }
            finally {
                setLoading(false);
            }
        }

        fetchAllJobs(dispatch, searchQuery);
    }, [])

    return (
        <div>
            <Navbar />

            {
                (loading) ? (
                    <>
                        <div className='flex justify-center my-5'>
                            <Loader2 className="animate-spin" />
                        </div>
                    </>
                ) : (
                    <div className='max-w-7xl m-auto'>
                        {
                            (allJobs.length == 0) ? (
                                <>
                                    <div className="flex justify-center my-5">
                                        <span className='font-medium text-3xl'>Oops No Job Found!</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1 className='font-medium text-4xl mt-7'>Search Results ({allJobs.length}) </h1>

                                    <div className='grid grid-cols-3 mt-5 gap-5'>
                                        {
                                            allJobs.map((job) => {
                                                return <Job job={job} />
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }

                    </div>
                )
            }


        </div>
    )
}
