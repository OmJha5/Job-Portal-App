import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export default function JobDescription() {
    let isApplied = false

    return (
        <div className='w-[100vw]'>
            <div className="max-w-7xl m-auto my-10">
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-medium text-2xl">Title</h1>
                        <div className='flex gap-3 my-4'>
                            <Badge className={"text-blue-700 font-bold"} variant="outline">12 Positions</Badge>
                            <Badge className={"text-[#F83002] font-bold"} variant="outline">Part Time</Badge>
                            <Badge className={"text-[#7209b7] font-bold"} variant="outline">12LPA</Badge>
                        </div>
                    </div>

                    <div>
                        <Button disabled={isApplied} className="bg-blue-500 hover:bg-blue-600">Apply Now</Button>
                    </div>
                </div>

                <h1 className='border-b-2 border-b-gray-300 font-medium text-2xl py-4'>Job Description</h1>

                <div>
                    <h1 className="font-bold text-xl my-3">Role : <span className='ml-4 text-lg font-normal text-gray-800'>Frontend</span></h1>
                    <h1 className="font-bold text-xl my-3">Location : <span className='ml-4 text-lg font-normal text-gray-800'>Bangalore</span></h1>
                    <h1 className="font-bold text-xl my-3">Description : <span className='ml-4 text-lg font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, autem.</span></h1>
                    <h1 className="font-bold text-xl my-3">Experience : <span className='ml-4 text-lg font-normal text-gray-800'>2+ yrs</span></h1>
                    <h1 className="font-bold text-xl my-3">Salary : <span className='ml-4 text-lg font-normal text-gray-800'>12 LPA</span></h1>
                    <h1 className="font-bold text-xl my-3">Total Applicants : <span className='ml-4 text-lg font-normal text-gray-800'>0</span></h1>
                    <h1 className="font-bold text-xl my-3">Posted Date : <span className='ml-4 text-lg font-normal text-gray-800'>12-02-2025</span></h1>
                </div>
            </div>

        </div>
    )
}
