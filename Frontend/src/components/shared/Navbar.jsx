import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/endpoint'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

export default function Navbar() {

    const user = useSelector((state) => state.auth.user);
    let dispath = useDispatch();
    let navigate = useNavigate();

    let handleLogout = async () => {
        try {
            let res = await axios.get(`${USER_API_ENDPOINT}/logout` , {withCredentials : true});
            if (res.data.success) {
                dispath(setUser(null));
                navigate("/");
                toast.success("Logged Out Successfully");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='bg-white w-[100vw]'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16 '>
                <div>
                    <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>Job <span className='text-red-700'>Portal</span></h1>
                </div>

                <div className='flex items-center gap-12'>

                    <ul className='flex font-medium items-center gap-5'>
                        {
                            (user && user.role == "student") ? (
                                <>
                                    <li><Link to="/" className='text-black'>Home</Link></li>
                                    <li><Link to="/jobs" className='text-black'>Jobs</Link></li>
                                    <li><Link to="/browse" className='text-black'>Browse</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/admin/companies" className='text-black'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='text-black'>Jobs</Link></li>
                                </>
                            )
                        }
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
                                        <AvatarImage src={(user?.profile?.profilePhoto) ? user.profile.profilePhoto : "https://github.com/shadcn.png"} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">

                                    <div className='flex gap-10 items-center'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={(user?.profile?.profilePhoto) ? user.profile.profilePhoto : "https://github.com/shadcn.png"} />
                                        </Avatar>

                                        <div>
                                            <h4 className='font-medium'>{user.name}</h4>
                                            <p className='text-sm text-muted-foreground '>{user.profile.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col mt-3 gap-y-2'>
                                        {
                                            user && user.role == "student" && 
                                                <div className='flex gap-5 items-center'>
                                                    <User2 />
                                                    <Button variant="link" className="focus:outline-none focus:ring-0"><Link to="/profile" className='text-black'>View Profile</Link></Button>
                                                </div>
                                        }

                                        <div className='flex gap-5 items-center'>
                                            <LogOut />
                                            <Button variant="link" onClick={handleLogout}>Logout</Button>
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
