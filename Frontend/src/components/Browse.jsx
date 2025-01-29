import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllJobs from '@/utils/fetchAllJobs';

export default function Browse() {

    let searchQuery = useSelector((state) => state.job.searchQuery);
    let allJobs = useSelector((state) => state.job.allJobs)
    let dispatch = useDispatch();

    useEffect(() => {
        fetchAllJobs(dispatch , searchQuery);
    } , [])

  return (
    <div>
        <Navbar/>

        <div className='max-w-7xl m-auto'>
            <h1 className='font-bold text-4xl mt-7'>Search Results ({allJobs.length}) </h1>

            <div className='grid grid-cols-3 mt-5 gap-5'>
                {
                    allJobs.map((job) => {
                        return <Job job={job} />
                    })
                }
            </div>

        </div>


    </div>
  )
}
