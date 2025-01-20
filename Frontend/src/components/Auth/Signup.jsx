import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div>
            <Navbar />

            <div className='flex justify-center items-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='text-3xl font-bold mb-5'>Signup</h1>

                    <div className='my-4'>
                        <Label className="block mb-3">Full Name</Label>
                        <Input type="text" placeholder="Enter your name"></Input>
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-3">Email</Label>
                        <Input type="email" placeholder="Enter your Email"></Input>
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-3">Phone Number</Label>
                        <Input type="text" placeholder="Enter your phone Number"></Input>
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-3">Password</Label>
                        <Input type="password" placeholder="Enter your password"></Input>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className="flex items-center">
                            <div className="flex items-center gap-5 my-5">
                                
                                <div className='flex gap-2'>
                                    <input type="radio" name="role" id="student" value="student" className='w-4 h-4 cursor-pointer'/>
                                    <Label htmlFor="student">Student</Label>
                                </div>

                                <div className='flex gap-2'>
                                    <input type="radio" name="role" id="recruiter" value="recruiter" className='w-4 h-4 cursor-pointer' />
                                    <Label htmlFor="recruiter">Recruiter</Label>
                                </div>

                            </div>

                        </div>

                        <div className='flex items-center gap-2'>
                            <Label htmlFor="profile" className="text-base">Profile </Label>
                            <Input accept="image/*" type="file" className="cursor-pointer" id="profile"></Input>
                        </div>

                    </div>

                    <Button type="submit" className="w-full my-4">Signup</Button>
                    <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></span>


                </form>

            </div>

        </div>
    )
}
