import React from 'react'
import {Popover , PopoverContent , PopoverTrigger,} from "@/components/ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
  
export default function Navbar() {
    const user = false;
    return (
        <div className='bg-white w-[100vw]'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16 '>
                <div>
                    <h1 className="text-2xl font-bold">Job <span className='text-red-700'>Portal</span></h1>
                </div>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to="/" className='text-black'>Home</Link></li>
                        <li><Link to="/jobs" className='text-black'>Jobs</Link></li>
                        <li><Link to="/browse" className='text-black'>Browse</Link></li>
                    </ul>

                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b38a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    
                                    <div className='flex gap-10 items-center'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar>

                                        <div>
                                            <h4 className='font-medium'>Job Portal</h4>
                                            <p className='text-sm text-muted-foreground '>Lorem ipsum, dolor sit.</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col my-4 gap-y-4'>
                                        <div className='flex gap-5 items-center'>
                                            <User2/>
                                            <Button variant="link" className="focus:outline-none focus:ring-0">View Profile</Button>
                                        </div>

                                        <div className='flex gap-5 items-center'>
                                            <LogOut/>
                                            <Button variant="link">Logout</Button>
                                        </div>
                                    </div>


                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
