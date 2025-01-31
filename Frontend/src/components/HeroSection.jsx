import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

export default function HeroSection() {
    let [query , setQuery] = useState("");
    let searchQuery = useSelector((state) => state.job.searchQuery)
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let setQueryStore = () => {
        dispatch(setSearchQuery(query))
        navigate("/browse")
    }

    return (
        <div className='text-center'>
            <div className="flex flex-col gap-5 my-10">
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Job</span> </h1>

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eum porro quasi fugit explicabo maxime!

                <div className='flex w-[40%] shadow-lg border border-gray-200 mx-auto rounded-full gap-10'>
                    <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder='Find Your Dream Jobs' className='outline-none border-none w-full rounded-full pl-3 py-2'/>
                    <Button className="rounded-none rounded-r-full bg-[#6A38C2] h-10" onClick={setQueryStore}>
                        <Search></Search>
                    </Button>

                </div>
            </div>
        </div>
    )
}
