import React, { useEffect } from 'react'
import LatestJobCards from './LatestJobCards';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllJobs from '@/utils/fetchAllJobs';
import { useNavigate } from 'react-router-dom';

export default function LatestJobs() {
    let allJobs = useSelector((state) => state.job.allJobs);
    let dispatch = useDispatch();

    useEffect(() => {
        fetchAllJobs(dispatch , ""); 
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold mt-20 mb-10 ml-10"><span className="text-[#6A38C2]">Latest & Top</span> Job Openings</h1>

            {/* Multiple Job Cards will get displayed below */}
            <div className='grid grid-cols-4 gap-10 justify-items-center'>
                {
                    allJobs.length == 0 ? <span>Sorry No Jobs For Now!</span> :(allJobs.slice(0, 6).map((job) => {
                        return <LatestJobCards key={job._id} job={job} />
                    })) 
                }
            </div>

        </div>
    )
}
