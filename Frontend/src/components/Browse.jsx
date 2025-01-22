import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';

export default function Browse() {
    const randomJobs = [1 , 2 , 3 , 4 , 5];

  return (
    <div>
        <Navbar/>

        <div className='max-w-7xl m-auto'>
            <h1 className='font-bold text-4xl mt-7'>Search Results ({randomJobs.length}) </h1>

            <div className='grid grid-cols-3 mt-5 gap-5'>
                {
                    randomJobs.map((elm) => {
                        return <Job/>
                    })
                }
            </div>

        </div>


    </div>
  )
}
