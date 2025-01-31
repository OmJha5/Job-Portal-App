import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from "@/components/ui/badge"
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialogBox from './UpdateProfileDialogBox'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Application_API_ENDPOINT } from '@/utils/endpoint'
import { setAllApplicationOfAUser } from '@/redux/applicationSlice'

export default function Profile() {
  let [open , setOpen] = useState(false);
  let user = useSelector((state) => state.auth.user);
  let dispatch = useDispatch();

  useEffect(() => {
    let getAllApplicationsByCurrUser = async() => {
        
        try{
            let res = await axios.get(`${Application_API_ENDPOINT}/get` , {withCredentials : true});
            console.log(res);

            if(res.data.success){
                dispatch(setAllApplicationOfAUser(res.data.application));
            }
        }
        catch(e){
          console.log(e);
        }
    }

    getAllApplicationsByCurrUser();
  } , [])

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">

        <div className='flex justify-between'>
          <div>
            <Avatar className=''>
              <AvatarImage className='w-[5rem] rounded-full' src={(user?.profile?.profilePhoto) ? user.profile.profilePhoto : "https://github.com/shadcn.png"} alt='Om'></AvatarImage>
            </Avatar>

            <h1 className='font-bold text-lg'>{user?.name}</h1>
            <p>{user?.profile?.bio}</p>
          </div>

          <div className='mt-5'>
            <Button variant="outline" onClick={() => setOpen(true)}><Pen /></Button>
          </div>
        </div>

        <div className='my-8'>
          <div className='flex gap-3 my-4'>
            <Mail/>
            <span>{user?.email}</span>
          </div>

          <div className='flex gap-3 my-4'>
            <Contact/>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className='my-5'>
            <h1 className="font-bold text-lg">Skills</h1>

            <div className="flex gap-3 my-2">
                { 
                    user?.profile?.skills.length == 0 ? "NA" : (
                      user?.profile?.skills.map((elm) => {
                          return <Badge>{elm}</Badge>
                          
                      })
                    )
                }
            </div>

        </div>
              
        <div className='my-5'>
            <h1 className="font-bold text-lg mb-2">Resume</h1>
            {
                (user?.profile?.resume) ? <a href={`${user.profile.resume}`} target='_blank' className='hover:underline'>{user.profile.resumeOriginalName}</a> : <span>NA</span>
            }
        </div>

        <div className='max-w-6xl bg-white m-auto rounded-2xl my-5 text-center'>
            <h1 className="font-bold text-3xl mb-5">Applied Jobs</h1>
            {/* Applied Job Table */}
            <AppliedJobTable/>

        </div>


      </div>
      
      <UpdateProfileDialogBox open={open} setOpen={setOpen} />
      

    </div>
  )
}
