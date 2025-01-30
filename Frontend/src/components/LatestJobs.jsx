import React, { useEffect, useState } from 'react'
import LatestJobCards from './LatestJobCards';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from '@/utils/endpoint';
import { Loader2 } from 'lucide-react';

export default function LatestJobs() {
    let allJobs = useSelector((state) => state.job.allJobs);
    let dispatch = useDispatch();
    let [loading, setLoading] = useState(true);

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

        fetchAllJobs(dispatch, "");
    }, []);

    return (
        <div>
            {
                (loading) ? (
                    <>
                        <div className='flex justify-center my-5'>
                            <Loader2 className="animate-spin" />
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold mt-20 mb-10 ml-10"><span className="text-[#6A38C2]">Latest & Top</span> Job Openings</h1>

                        {/* Multiple Job Cards will get displayed below */}
                        <div className='grid grid-cols-4 gap-10 justify-items-center'>
                            {
                                allJobs?.length == 0 ? <span>Sorry No Jobs For Now!</span> : (allJobs?.slice(0, 6)?.map((job) => {
                                    return <LatestJobCards key={job._id} job={job} />
                                }))
                            }
                        </div>
                    </>
                )
            }

        </div>
    )
}
