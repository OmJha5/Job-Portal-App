import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function JobsTable() {
    let textToFilterJob = useSelector((state) => state.job.textToFilterJob);
    let allJobsByCurr = useSelector((state) => state.job.allJobsByCurr);
    let [filteredJob, setFilteredJob] = useState(allJobsByCurr);
    let navigate = useNavigate();

    useEffect(() => {
        setFilteredJob(allJobsByCurr); 
    }, [allJobsByCurr]);
    
    useEffect(() => {
        let filterJobs = allJobsByCurr.filter((job) => {
            if(textToFilterJob == "") return true;
            return job?.companyId?.name?.toLowerCase().includes(textToFilterJob.toLowerCase()) || job?.title.toLowerCase().includes(textToFilterJob.toLowerCase());
        })

        setFilteredJob(filterJobs);

    } , [textToFilterJob])

    return (
        <div>
            {
                filteredJob?.length == 0 ? <span>No Available Jobs!</span> : (
                    <>
                        <Table>
                            <TableCaption>A list of your Created Jobs</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Company Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    filteredJob?.map((job) => {
                                        return (
                                            <TableRow key={job?._id}>
                                                <TableCell className="font-medium text-left">
                                                    <Avatar className=''>
                                                        <AvatarImage className='w-[50px] h-[50px] rounded-full' src={`${job?.companyId?.logo}`} alt='Om'></AvatarImage>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell className="text-left">{job?.companyId?.name}</TableCell>
                                                <TableCell className="text-left">{job?.title}</TableCell>
                                                <TableCell className="text-left">{job?.createdAt?.split("T")[0]}</TableCell>
                                                <TableCell className="text-right">
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <MoreHorizontal />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <div className="flex flex-col gap-2 p-3 shadow-lg rounded-md  relative z-50 bg-white">
                                                                    <div className='flex gap-2 w-full cursor-pointer' onClick={() => navigate(`/admin/jobs/edit/${job?._id}`)}>
                                                                        <Edit2 />
                                                                        <span>Edit</span>
                                                                    </div>
                                                                    <div className='flex gap-2 w-full cursor-pointer' onClick={() => navigate(`/admin/jobs/applicants/${job?._id}`)}>
                                                                        <Eye/>
                                                                        <span>Applicant</span>
                                                                    </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                            </TableRow>
                                        )

                                    })
                                }
                            </TableBody>
                        </Table>

                    </>
                )
            }


        </div>
    )
}
