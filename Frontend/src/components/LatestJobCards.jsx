import React from 'react'
import { Badge } from "@/components/ui/badge"

export default function LatestJobCards() {
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='text-4xl font-medium'>Company Name</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>

        <div>
            <h1 className='text-2xl font-bold'>Job Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, natus.</p>
        </div>

        <div className='flex gap-3 my-4'>
            <Badge className={"text-blue-700 font-bold"} variant="outline">12 Positions</Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="outline">Part Time</Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="outline">24LPA</Badge>
        </div>


    </div>
  )
}
