import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from '@/utils/endpoint';
import { Loader2 } from 'lucide-react';

export default function Jobs() {
    const dispatch = useDispatch();
    const allJobs = useSelector((state) => state.job.allJobs)
    let [loading , setLoading] = useState(true);

    useEffect(() => {
        let fetchAllJobs = async(dispatch , searchQuery) => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, { withCredentials: true });
                if (res.data.success) {
                  dispatch(setAllJobs(res.data.jobs));
                }
              } catch (e) {
                console.error("Error fetching jobs:", e);
            }
            finally{
                setLoading(false);
            }
        }

        fetchAllJobs(dispatch , "");

    }, []); 

  return (
    <div>
        <Navbar/>
        
        {
            (loading) ?(
                <>
                    <div className='flex justify-center my-5'>
                        <Loader2 className="animate-spin"  />
                    </div>
                </>
            ) : (
                <div className='flex max-w-7xl my-10 mx-auto'>
                    <div className='w-[20%]'><FilterCard/></div>

                    <div className='grid grid-cols-3 gap-5 flex-1 h-[80%] overflow-y-scroll'>
                        {   
                            allJobs.length == 0 ? <span>Jobs Not found</span> :(
                                allJobs.map((job) => {
                                    return <Job key={job._id} job={job} />
                                })
                            )
                        }
                    </div>
                </div>
            )
        }


        
    </div>
  )
}
