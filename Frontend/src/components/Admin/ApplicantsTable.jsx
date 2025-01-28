import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Application_API_ENDPOINT } from '@/utils/endpoint';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicationOfAJob } from '@/redux/applicationSlice';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Check, CircleX, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export default function ApplicantsTable() {
    let applicantStatus = ["Accepted" , "Rejected"];
    let params = useParams();
    let jobId = params.id;
    let allApplicationOfAJob = useSelector((state) => state.application.allApplicationOfAJob);
    let dispatch = useDispatch();

    let setStatusOfUserApplication = async(status , id) => {
        try{
            let res = await axios.post(`${Application_API_ENDPOINT}/status/${id}/update`, {"status" : status} , {withCredentials : true})
            
            if(res.data.success){
                toast.success("Application status updated.");
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>

            <Table>
                <TableCaption>A list of the applications for this job.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicationOfAJob.map((application) => {
                            return <TableRow key={application._id}>
                                    <TableCell>{application?.applicant?.name}</TableCell>
                                    <TableCell>{application?.applicant?.email}</TableCell>
                                    <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                    <TableCell><a href={application?.applicant?.profile?.resume} target="_blank" >{application?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                    <TableCell>{application?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>   
                                            <PopoverContent className='bg-white relative z-50 shadow-2xl border border-gray-300 rounded-sm flex gap-2 flex-col'>
                                                {
                                                    applicantStatus.map((status , ind) => {
                                                        return <div key={ind} className='px-4 my-1 cursor-pointer' onClick={() => setStatusOfUserApplication(status , application._id)}>
                                                            <span className='hover:text-gray-800'>{status}</span>
                                                        </div>
                                                        
                                                    })
                                                    
                                                    
                                                }
                                            </PopoverContent>
                                        
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                        })
                    }
                </TableBody>
            </Table>

        </div>
    )
}
