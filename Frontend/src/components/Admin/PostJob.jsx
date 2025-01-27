import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Company_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/endpoint';
import axios from 'axios';
import { setAllCompanies } from '@/redux/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function PostJob() {
    let allCompanies = useSelector((state) => state.company.allCompanies);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: "",
    })
    let [loading, setLoading] = useState(false)

    let handleOnClick = (e) => {
        setInput({ ...input, [e?.target?.name]: e?.target?.value });
    }

    let companyChange = (value) => {
        let targetCompany = allCompanies.find((company) => company?.name?.toLowerCase() == value);
        setInput({ ...input, companyId: targetCompany._id });
    }

    let submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            let res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })

            if (res.data.success) {
                navigate("/admin/jobs");
                toast.success("Job Posted Successfully!");
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }

    }



    useEffect(() => {
        let getAllCompanies = async () => {
            try {
                let res = await axios.get(`${Company_API_ENDPOINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.companies));
                }
            }
            catch (e) {
                console.log(e)
            }
        }

        getAllCompanies();
    }, [])

    return (
        <div>
            <Navbar />

            <div className='max-w-4xl border border-gray-300 shadow-lg mx-auto my-10 rounded-md'>
                {
                    allCompanies.length == 0 ? <h1 className='p-5 font-medium text-center text-xl'>Please Register Atleast one company To Post a Job!</h1> : (
                        <form onSubmit={submitHandler} className='p-10'>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <Label className="font-medium mb-2 inline-block" name="title">Title</Label>
                                    <Input id="title" name="title" onChange={handleOnClick} />
                                </div>

                                <div>
                                    <Label className="font-medium mb-2 inline-block" name="requirements">Requirements</Label>
                                    <Input id="requirements" name="requirements" onChange={handleOnClick} />
                                </div>

                                <div>
                                    <Label className="font-medium mb-2 inline-block" name="salary">Salary</Label>
                                    <Input id="salary" name="salary" onChange={handleOnClick} />
                                </div>

                                <div>
                                    <Label className="font-medium mb-2" name="jobType">Job Type</Label>
                                    <Input id="jobType" name="jobType" onChange={handleOnClick} />
                                </div>

                                <div>
                                    <Label className="font-medium mb-2 inline-block" name="location">Location</Label>
                                    <Input id="location" name="location" onChange={handleOnClick} />
                                </div>

                                <div>
                                    <Label className="font-medium mb-2 inline-block" name="experience">Experience</Label>
                                    <Input id="experience" name="experience" onChange={handleOnClick} />
                                </div>

                                <div>
                                    <Label className="font-medium mb-2 inline-block" name="position">Position</Label>
                                    <Input id="position" name="position" onChange={handleOnClick} />
                                </div>

                                <div>
                                    <Label className="font-medium mb-2 inline-block" name="any">Company</Label>
                                    <Select onValueChange={companyChange}>
                                        <SelectTrigger className="font-light">
                                            <SelectValue placeholder="Choose a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                allCompanies.map((company) => {
                                                    return (
                                                        <SelectItem key={company?._id} value={company?.name?.toLowerCase()}>
                                                            <div className="flex items-center justify-center gap-3">
                                                                <img src={company?.logo} className='w-[25px] h-[25px] rounded-full' />
                                                                <span>{company?.name}</span>
                                                            </div>
                                                        </SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='col-span-2'>
                                    <Label className="font-medium mb-2 inline-block" name="description" >Description</Label>
                                    <Textarea id="description" onChange={handleOnClick} name="description" />
                                </div>

                            </div>
                            {
                                (!loading) ? <Button type="submit" className="w-full my-5">Post</Button> : <Button type="submit" className="w-full my-5"><Loader2 className="animate-spin mr-2" /> Please wait</Button>
                            }
                        </form>
                    )
                }
            </div>

        </div>
    )
}
