import React from 'react'
import { Badge } from "@/components/ui/badge"

export default function LatestJobCards({ job }) {
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='text-3xl font-normal'>{job?.companyId?.name}</h1> 
            <p className='text-sm text-gray-500'>{job.location}</p>
        </div>

        <div className='my-2'>
            <h1 className='text-2xl font-bold mb-2'>{job.title}</h1>
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
