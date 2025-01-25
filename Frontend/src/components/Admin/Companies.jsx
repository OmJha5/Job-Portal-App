import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllCompanies } from '@/redux/companySlice'
import { Company_API_ENDPOINT } from '@/utils/endpoint'
import axios from 'axios'

export default function Companies() {
  let navigate = useNavigate();
  let allCompanies = useSelector((state) => state.company.allCompanies);
  let dispath = useDispatch();

    useEffect(() => {
        let getAllCompanies = async() => {
            try{
                let res = await axios.get(`${Company_API_ENDPOINT}/get` , {withCredentials : true});
                if(res.data.success){
                    dispath(setAllCompanies(res.data.companies));
                }
            }
            catch(e){
                console.log(e)
            }
        }

        getAllCompanies();
    } , [])

  return (
    <div>
        <Navbar/>
        
        <div className='max-w-6xl m-auto'>
            <div className="flex justify-between my-10">
                <Input placeholder = "Filter By Name" className="w-fit" />
                <Button onClick={() => navigate("/admin/companies/create")} >Add Company</Button>
            </div>

            <CompaniesTable/>
        </div>


    </div>
  )
}
