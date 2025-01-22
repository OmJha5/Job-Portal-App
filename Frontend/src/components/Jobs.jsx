import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard';
import Job from './Job';

export default function Jobs() {
    const jobsArray = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13];

  return (
    <div>
        <Navbar/>
        
        <div className='flex max-w-7xl my-10 mx-auto'>
            <div className='w-[20%]'><FilterCard/></div>

            <div className='grid grid-cols-3 gap-5 flex-1 h-[80%] overflow-y-scroll'>
                {   
                    jobsArray.length == 0 ? <span>Jobs Not found</span> :(
                        jobsArray.map((job , ind) => {
                            return <Job key={ind} />
                        })
                    )
                }
            </div>
        </div>


        
    </div>
  )
}
