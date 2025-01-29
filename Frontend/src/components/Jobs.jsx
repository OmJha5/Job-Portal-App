import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllJobs from '@/utils/fetchAllJobs';

export default function Jobs() {
    const dispatch = useDispatch();
    const allJobs = useSelector((state) => state.job.allJobs)

    useEffect(() => {
        fetchAllJobs(dispatch , ""); 
    }, []); 

  return (
    <div>
        <Navbar/>
        
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


        
    </div>
  )
}
