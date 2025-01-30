import { setAllJobs } from '@/redux/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function FilterCard() {
    let allJobs = useSelector((state) => state.job.allJobs)
    let [tempAllJobs , setTempAllJobs] = useState([]);
    let [filterValue , setFilterValue] = useState([]);
    let dispatch = useDispatch();

    useEffect(() => {
        setTempAllJobs(allJobs)
    } , [])
    
    const filterData = [
        {
            filterType : "Location",
            area : ["Delhi NCR" , "Bangalore" , "Hyderbad" , "Pune" , "Mumbai"]
        },
        {
            filterType : "Industry",
            area : ["Frontend Developer" , "Backend Developer" , "FullStack Developer" , "Graphic Designer"]
        },
        {
            filterType : "Salary",
            area : ["8-40k" , "42-1lakh" , "1lakh to 5lakh"]
        },
    ]

    let handleOnChange = (e) => {
        

        if(e.target.checked){
            let filteredJobs = []
            let value = e.target.value.toLowerCase();

            filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(value) || job.description.toLowerCase().includes(value) || job.location.toLowerCase().includes(value);
            })

            dispatch(setAllJobs(filteredJobs))
            setFilterValue([...filterValue , value]);
        }
        else{
            let extractedValue = filterValue.filter((value) => {return value.toLowerCase() != e.target.value.toLowerCase()});

            let filteredJobs = tempAllJobs.filter((job) => {
                let isJobValid = true;

                for(let i = 0; i < extractedValue.length; i++){
                    let value = extractedValue[i];
                    let res = job.title.toLowerCase().includes(value) || job.description.toLowerCase().includes(value) || job.location.toLowerCase().includes(value);
                    if(!res){
                        isJobValid = false;
                        break;
                    }
                }

                return isJobValid;
            })
            dispatch(setAllJobs(filteredJobs))
            setFilterValue(extractedValue);
        }
    }

  return (
    <div>
        <h1 className="text-4xl font-medium">Filter Jobs</h1>
        <hr className='mt-3' />

        {
            filterData.map((data) => {
                return <div className="flex flex-col gap-1 mb-4">
                    <h1 className="font-bold text-lg">{data.filterType}</h1>

                    {
                        data.area.map((elm) => {
                            return <div className="flex gap-2">
                                <input type="checkbox" name={elm} value={elm} id={elm} onChange={handleOnChange} />
                                <label htmlFor={elm} className="cursor-pointer">{elm}</label>
                            </div>
                        })
                    }

                </div>
            })
        }
        

    </div>
  )
}
