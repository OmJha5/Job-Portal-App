import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

export default function Job({job}) {
    let navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }
    
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100'>
        <div className="flex justify-between">
            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
        </div>


        <div className="flex items-center my-2 gap-4">
            <Avatar className=''>
                    <AvatarImage className='w-[40px] h-[40px] rounded-full' src={job?.companyId?.logo} alt='Om'></AvatarImage>
            </Avatar>

            <div>
                <h1 className='font-normal text-lg'>{job?.companyId?.name}</h1>
                <p className='text-sm text-gray-600'>{job.location}</p>
            </div>

        </div>

        <div className='my-2'>
            <h1 className='font-bold text-lg my-2'>{job.title}</h1>
            <p className='text-sm text-gray-600'>{job.description}</p>
        </div>

        <div className='flex gap-3 my-4'>
            <Badge className={"text-blue-700 font-bold"} variant="outline">{job.position} Positions</Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="outline">{job.jobType}</Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="outline">{job.salary} LPA</Badge>
        </div>

        <div className='flex gap-4 my-3'>
            <Button variant="outline" onClick={() => navigate(`/jobs/description/${job._id}`)}>Details</Button>
            <Button className="bg-[#7209b7]">Save For Later</Button>
        </div>

        
    </div>
  )
}
