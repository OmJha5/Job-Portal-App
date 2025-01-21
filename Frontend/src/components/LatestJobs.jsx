import React from 'react'
import LatestJobCards from './LatestJobCards';

export default function LatestJobs() {
    let randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div>
            <h1 className="text-4xl font-bold mt-20 mb-10 ml-10"><span className="text-[#6A38C2]">Latest & Top</span> Job Openings</h1>

            {/* Multiple Job Cards will get displayed below */}
            <div className='grid grid-cols-3 gap-10 justify-items-center'>
                {
                    randomJobs.slice(0, 6).map((job , ind) => {
                        return <LatestJobCards key={ind} />
                    })
                }
            </div>

        </div>
    )
}
