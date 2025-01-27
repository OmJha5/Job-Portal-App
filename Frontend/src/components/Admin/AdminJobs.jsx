import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import JobsTable from './JobsTable'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { setAllJobsByCurr, setTextToFilterJob } from '@/redux/jobSlice'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/endpoint'

export default function AdminJobs() {
  let [input, setInput] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTextToFilterJob(input));
  }, [input])

  useEffect(() => {
    let getAllJobsByCurr = async() => {
        try{
            let res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs` , {withCredentials : true});
            if(res.data.success){
                dispatch(setAllJobsByCurr(res.data.jobs));
            }
        }
        catch(e){
            console.log(e)
        }
    }

    getAllJobsByCurr();
} , [])

  return (
    <div>
      <Navbar />

      <div className='max-w-6xl m-auto'>
        <div className="flex justify-between my-10">
          <Input placeholder="Filter By Name , Role" className="w-fit" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate("/admin/companies/create")} >Add New Job</Button>
        </div>

        <JobsTable />
      </div>

    </div>
  )
}
