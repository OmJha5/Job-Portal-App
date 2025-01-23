import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

export default function Job() {
    let navigate = useNavigate();
    let jobId = "dkjdfdfjd";
    
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100'>
        <div className="flex justify-between">
            <p className='text-sm text-gray-500'>2 Days Ago</p>
            <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
        </div>


        <div className="flex items-center my-2 gap-4">
            <Avatar className=''>
                    <AvatarImage className='w-[3rem] rounded-full' src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt='Om'></AvatarImage>
            </Avatar>

            <div>
                <h1 className='font-bold text-lg'>Company Name</h1>
                <p className='text-sm text-gray-600'>India</p>
            </div>

        </div>

        <div>
            <h1 className='font-bold text-lg my-2'>Title</h1>
            <p className='text-sm text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, consequuntur.</p>
        </div>

        <div className='flex gap-3 my-4'>
            <Badge className={"text-blue-700 font-bold"} variant="outline">12 Positions</Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="outline">Part Time</Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="outline">24LPA</Badge>
        </div>

        <div className='flex gap-4 my-3'>
            <Button variant="outline" onClick={() => navigate(`/jobs/description/${jobId}`)}>Details</Button>
            <Button className="bg-[#7209b7]">Save For Later</Button>
        </div>

        
    </div>
  )
}
