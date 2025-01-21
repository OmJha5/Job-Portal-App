import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/endpoint'
import { toast } from "sonner"
import axios from 'axios'

export default function Signup() {
    let [input , setInput] = useState({
        name : "",
        email : "",
        phoneNumber : "",
        password : "",
        role : "",
        file : ""
    })

    const changeEventHandler = (e) => {
        setInput({...input , [e.target.name] : e.target.value})
    }

    const changeFileHandler = (e) => {
        setInput({...input , file : e.target.files ?. [0]});
    }

    let navigate = useNavigate();
    
    const submitHandler = async (e) => {
        e.preventDefault();

        try{
            const formData = new FormData();
            formData.append("name" , input.name); 
            formData.append("email" , input.email); 
            formData.append("phoneNumber" , input.phoneNumber); 
            formData.append("password" , input.password); 
            formData.append("role" , input.role); 
            if(input.file){
                // IF file is not undefined
                formData.append("file" , input.file);
            }

            const res = await axios.post(`${USER_API_ENDPOINT}/register` , formData , {
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials : true
            })

            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(e){
            toast.error(e.response.data.message)
        }
    }

    return (
        <div>
            <Navbar />

            <div className='flex justify-center items-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='text-3xl font-bold mb-5'>Signup</h1>

                    <div className='my-4'>
                        <Label className="block mb-3">Full Name</Label>
                        <Input type="text" placeholder="Enter your name" name="name" value={input.name} onChange={changeEventHandler}></Input>
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-3">Email</Label>
                        <Input type="email" placeholder="Enter your Email" name="email" value={input.email} onChange={changeEventHandler}></Input>
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-3">Phone Number</Label>
                        <Input type="text" placeholder="Enter your phone Number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}></Input>
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-3">Password</Label>
                        <Input type="password" placeholder="Enter your password" name="password" value={input.password} onChange={changeEventHandler}></Input>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className="flex items-center">
                            <div className="flex items-center gap-5 my-5">
                                
                                <div className='flex gap-2'>
                                    <input type="radio" name="role" id="student" value="student" className='w-4 h-4 cursor-pointer' onChange={changeEventHandler}/>
                                    <Label htmlFor="student">Student</Label>
                                </div>

                                <div className='flex gap-2'>
                                    <input type="radio" name="role" id="recruiter" value="recruiter" className='w-4 h-4 cursor-pointer' onChange={changeEventHandler} />
                                    <Label htmlFor="recruiter">Recruiter</Label>
                                </div>

                            </div>

                        </div>

                        <div className='flex items-center gap-2'>
                            <Label htmlFor="profile" className="text-base">Profile </Label>
                            <Input accept="image/*" type="file" className="cursor-pointer" id="profile" name="file" onChange={changeFileHandler}></Input>
                        </div>

                    </div>

                    <Button type="submit" className="w-full my-4">Signup</Button>
                    <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></span>


                </form>

            </div>

        </div>
    )
}
