import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';

export default function LatestJobCards({ job }) {
  let navigate = useNavigate();

  return (
    <div className='p-10 rounded-md shadow-xl border border-gray-100 cursor-pointer' onClick={() => navigate(`/jobs/description/${job._id}`)}>
        <div>
            <div className="flex gap-2 items-center">
              <img src={job?.companyId?.logo} alt="" className="w-[30px] h-[30px]"  />
              <h1 className='font-normal text-lg'>{job?.companyId?.name}</h1>
            </div> 

            <p className='text-sm my-2 text-gray-500'>{job.location}</p>
        </div>

        <div className='my-2'>
            <h1 className='font-bold text-lg my-2'>{job.title}</h1>
            <p className='text-sm text-gray-600'>{job.description}</p>
        </div>

        <div className='flex gap-3 my-4'>
            <Badge className={"text-blue-700 font-bold"} variant="outline">{job.position} Positions</Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="outline">{job?.jobType}</Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="outline">{job.salary} LPA</Badge>
        </div>


    </div>
  )
}
