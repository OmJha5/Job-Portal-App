import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/endpoint'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'

export default function JobDescription() {
    let isApplied = false
    let params = useParams()
    let jobId = params.id
    let singleJob = useSelector((state) => state.job.singleJob)
    let dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleJob = async() => {
            try{
                let res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}` , {withCredentials : true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                }
            }
            catch(e){
                console.log(e)
            }
        }

        fetchSingleJob();
    } , [])

    return (
        <div className='w-[100vw]'>
            <div className="max-w-7xl m-auto my-10">
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-medium text-2xl">{singleJob?.title}</h1>
                        <div className='flex gap-3 my-4'>
                            <Badge className={"text-blue-700 font-bold"} variant="outline">{singleJob?.position} Positions</Badge>
                            <Badge className={"text-[#F83002] font-bold"} variant="outline">{singleJob?.jobType}</Badge>
                            <Badge className={"text-[#7209b7] font-bold"} variant="outline">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>

                    <div>
                        <Button disabled={isApplied} className="bg-blue-500 hover:bg-blue-600">Apply Now</Button>
                    </div>
                </div>

                <h1 className='border-b-2 border-b-gray-300 font-medium text-2xl py-4'>Job Description</h1>

                <div>
                    <h1 className="font-bold text-xl my-3">Role : <span className='ml-4 text-lg font-normal text-gray-800'>Frontend</span></h1>
                    <h1 className="font-bold text-xl my-3">Location : <span className='ml-4 text-lg font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className="font-bold text-xl my-3">Description : <span className='ml-4 text-lg font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className="font-bold text-xl my-3">Experience : <span className='ml-4 text-lg font-normal text-gray-800'>{singleJob?.experience}+ yrs</span></h1>
                    <h1 className="font-bold text-xl my-3">Salary : <span className='ml-4 text-lg font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className="font-bold text-xl my-3">Total Applicants : <span className='ml-4 text-lg font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
                    <h1 className="font-bold text-xl my-3">Posted Date : <span className='ml-4 text-lg font-normal text-gray-800'>{singleJob?.createdAt?.split("T")?.[0]}</span></h1>
                </div>
            </div>

        </div>
    )
}
