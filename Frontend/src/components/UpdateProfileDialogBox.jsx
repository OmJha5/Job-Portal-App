import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, XIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/endpoint'
import { toast } from 'sonner'
import { setLoading, setUser } from '@/redux/authSlice'

export default function UpdateProfileDialogBox(props) {
    let loading = useSelector((state) => state.auth.loading);
    let user = useSelector((state) => state.auth.user);
    let dispatch = useDispatch();

    let [input, setInput] = useState({
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills,
    })

    let onChangeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    let onFileHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.files?.[0] });
    }

    let submitHandler = async (e) => {
        e.preventDefault();

        try {   
            
            dispatch(setLoading(true));
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("bio", input.bio);
            formData.append("skills", input.skills);
            if(input.file){
                formData.append("file" , input.file);
            }

            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            if (res.data.success) {
                toast.success(res.data.message);
                props.setOpen(false);
                dispatch(setLoading(false));
                dispatch(setUser(res.data.user));
                const { file, ...updatedInput } = input;
                setInput(updatedInput);
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch(e){
            console.log(e);
        }
    }


  return (

            <div>
                <Dialog open={props.open}>
                    <DialogContent className="[&>button]:hidden sm:max-w-[400px] md:max-w-[700px]" onInteractOutside={() => props.setOpen(false)}>
                        <DialogHeader>
                            <DialogTitle className="relative top-[1.5rem]">Update Profile</DialogTitle>
                        </DialogHeader>

                        <DialogClose asChild={true}>
                            <XIcon className="flex justify-self-end relative bottom-[1rem] cursor-pointer" onClick={() => props.setOpen(false)} />
                        </DialogClose>

                        <form onSubmit={submitHandler}>
                            <div className="my-4">
                                <div className='grid grid-cols-4 items-center'>
                                    <Label name="name">Name</Label>
                                    <Input id="name" name="name" type="text" className="col-span-3" value={input.name} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className='grid grid-cols-4 items-center'>
                                    <Label name="email">Email</Label>
                                    <Input disabled={true} id="email" name="email" type="email" className="col-span-3" value={input.email} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className='grid grid-cols-4 items-center'>
                                    <Label name="phoneNumber">Phone Number</Label>
                                    <Input id="phoneNumber" name="phoneNumber" className="col-span-3" value={input.phoneNumber} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className='grid grid-cols-4 items-center'>
                                    <Label name="bio">Bio</Label>
                                    <Input id="bio" name="bio" className="col-span-3" value={input.bio} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className='grid grid-cols-4 items-center'>
                                    <Label name="skills">Skills</Label>
                                    <Input id="skills" name="skills" className="col-span-3" value={input.skills} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className='grid grid-cols-4 items-center'>
                                    <Label name="file">Resume</Label>
                                    <Input id="file" name="file" type="file" accept="application/pdf" className="col-span-3" onChange={onFileHandler} />
                                </div>
                            </div>

                            <DialogFooter>
                                {
                                    (!loading) ? <Button type="submit" className="w-full my-4">Update</Button> : <Button type="submit" className="w-full my-4"><Loader2 className="animate-spin mr-2" /> Please wait</Button>
                                }
                            </DialogFooter>

                        </form>

                    </DialogContent>
                </Dialog>
            </div>
        )
    }
