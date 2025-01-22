import { Label } from "@/components/ui/label"
import React from 'react'

export default function FilterCard() {
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

  return (
    <div>
        <h1 className="text-4xl font-bold">Filter Jobs</h1>
        <hr className='mt-3' />

        {
            filterData.map((data) => {
                return <div className="flex flex-col gap-1 mb-4">
                    <h1 className="font-bold text-lg">{data.filterType}</h1>

                    {
                        data.area.map((elm) => {
                            return <div className="flex gap-2">
                                <input type="radio" name="filter" value={elm} />
                                <label>{elm}</label>
                            </div>
                        })
                    }

                </div>
            })
        }
        

    </div>
  )
}
