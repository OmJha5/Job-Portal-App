import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllCompanies, setTextToFilterCompany } from '@/redux/companySlice'
import { Company_API_ENDPOINT } from '@/utils/endpoint'
import axios from 'axios'

export default function Companies() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [input , setInput] = useState("");

    useEffect(() => {
        let getAllCompanies = async() => {
            try{
                let res = await axios.get(`${Company_API_ENDPOINT}/get` , {withCredentials : true});
                if(res.data.success){
                    dispatch(setAllCompanies(res.data.companies));
                }
            }
            catch(e){
                console.log(e)
            }
        }

        getAllCompanies();
    } , [])

    useEffect(() => {
        dispatch(setTextToFilterCompany(input));
    } , [input])

  return (
    <div>
        <Navbar/>
        
        <div className='max-w-6xl m-auto'>
            <div className="flex justify-between my-10">
                <Input placeholder = "Filter By Name" className="w-fit" onChange={(e) => setInput(e.target.value)} />
                <Button onClick={() => navigate("/admin/companies/create")} >Add Company</Button>
            </div>

            <CompaniesTable/>
        </div>


    </div>
  )
}
