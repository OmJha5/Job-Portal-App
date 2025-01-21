import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '@/utils/endpoint'

export default function Login() {
    let [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    let navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post(`${USER_API_ENDPOINT}/login` , input , {
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            })

            if(res.data.success){
                toast.success(res.data.message);
                navigate("/");
            }
            else{
                toast.error(res.data.message)
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
                    <h1 className='text-3xl font-bold mb-5'>Login</h1>

                    <div className='my-4'>
                        <Label className="block mb-3">Email</Label>
                        <Input type="email" placeholder="Enter your Email" name="email" value={input.email} onChange={changeEventHandler}></Input>
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-3">Password</Label>
                        <Input type="password" placeholder="Enter your password" name="password" value={input.password} onChange={changeEventHandler}></Input>
                    </div>

                    <div className="flex items-center gap-5 my-5">

                        <div className='flex gap-2'>
                            <input type="radio" name="role" id="student" value="student" className='w-4 h-4 cursor-pointer' onChange={changeEventHandler}/>
                            <Label htmlFor="student">Student</Label>
                        </div>

                        <div className='flex gap-2'>
                            <input type="radio" name="role" id="recruiter" value="recruiter" className='w-4 h-4 cursor-pointer' onChange={changeEventHandler}/>
                            <Label htmlFor="recruiter">Recruiter</Label>
                        </div>

                    </div>

                    <Button type="submit" className="w-full my-4">Login</Button>

                    <span className='text-sm'>Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link></span>

                </form>

            </div>

        </div>
    )
}
