import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from "@/components/ui/badge"
import AppliedJobTable from './AppliedJobTable'


export default function Profile() {
  let skills = ["Javascript" , "React" , "Nodejs" , "Express" , "MongoDB"]
  let isResume = 1;

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">

        <div className='flex justify-between'>
          <div>
            <Avatar className=''>
              <AvatarImage className='w-[5rem] rounded-full' src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt='Om'></AvatarImage>
            </Avatar>

            <h1 className='font-bold text-lg'>Full Name</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, exercitationem!</p>
          </div>

          <div className='mt-5'>
            <Button variant="outline"><Pen /></Button>
          </div>
        </div>

        <div className='my-8'>
          <div className='flex gap-3 my-4'>
            <Mail/>
            <span>omjha003@gmail.com</span>
          </div>

          <div className='flex gap-3 my-4'>
            <Contact/>
            <span>8851814506</span>
          </div>
        </div>

        <div className='my-5'>
            <h1 className="font-bold text-lg">Skills</h1>

            <div className="flex gap-3 my-2">
                { 
                    skills.length == 0 ? "NA" : (
                      skills.map((elm) => {
                          return <Badge>{elm}</Badge>
                          
                      })
                    )
                }
            </div>

        </div>
              
        <div className='my-5'>
            <h1 className="font-bold text-lg mb-2">Resume</h1>
            {
                isResume ? <a href="https://youtube.com" target='_blank' className='hover:underline'>Om Kumar Jha</a> : NA
            }
        </div>

        <div className='max-w-6xl bg-white m-auto rounded-2xl my-5 text-center'>
            <h1 className="font-bold text-3xl mb-5">Applied Jobs</h1>
            {/* Applied Job Table */}
            <AppliedJobTable/>

        </div>


      </div>

    </div>
  )
}
