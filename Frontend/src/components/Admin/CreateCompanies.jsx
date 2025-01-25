import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Textarea } from '../ui/textarea'
import { Company_API_ENDPOINT } from '@/utils/endpoint'
import { useDispatch, useSelector } from 'react-redux'
import { setAllCompanies } from '@/redux/companySlice'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

export default function CreateCompanies() {
    let navigate = useNavigate();
    let dispath = useDispatch();
    let [loading , setLoading] = useState(false);
    let allCompanies = useSelector((state) => state.company.allCompanies);

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

    let [input , setInput] = useState({
        name : "",
        location : "",
        website : "",
        description : "",
        file : "",
    })

    let eventChangeHandler = (e) => {
        setInput({...input , [e.target.name] : e.target.value});
    }

    let fileChangeHandler = (e) => {
        setInput({...input , file : e.target.files?.[0]})
    }

    let submitHandler = async(e) => {
        e.preventDefault();

        try{
            setLoading(true);
            let formData = new FormData();
            formData.append("name" , input.name);
            formData.append("location" , input.location);
            formData.append("description" , input.description);
            formData.append("website" , input.website);
            if(input.file){
                formData.append("file" , input.file)
            }

            let res = await axios.post(`${Company_API_ENDPOINT}/createCompany` , formData , {
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials : true
            })

            if(res.data.success){
                let updatedCompanies = [...allCompanies, res.data.company];
                dispath(setAllCompanies(updatedCompanies)); // Update Redux state immutably
                toast.success("Company Created Successfully!");
                navigate("/admin/companies");
            }
            
        }
        catch(e){
            console.log(e);
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div>
        <Navbar/>

        <div className="max-w-4xl mx-auto mt-10">
            <div className='my-10'>
                <h1 className="font-bold text-3xl">Company Details</h1>
            </div>

            <form onSubmit={submitHandler} >
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <Input id="name" className="my-2" name="name" placeholder="Microsoft" value={input.name} onChange={eventChangeHandler} required />
                    </div>

                    <div>
                        <Label htmlFor='location'>Location</Label>
                        <Input id="location" className="my-2" name="location" placeholder="Bangalore" onChange={eventChangeHandler} value={input.location} required />
                    </div>

                    <div className="col-span-full">
                        <Label htmlFor='website'>Website</Label>
                        <Input id="website" type="url" name="website" className="my-2" placeholder="www.Microsoft.com" onChange={eventChangeHandler} value={input.website} required />
                    </div>

                    <div className='col-span-full'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea id="description" name="description" placeholder="Built to conquer the world" onChange={eventChangeHandler} value={input.description} required />
                    </div>

                    <div>
                        <Label htmlFor='file'>Logo</Label>
                        <Input id="file" name="file" className="my-2" type="file" required accept="image/*" onChange={fileChangeHandler} />
                    </div>
                </div>

                <div className="flex gap-4 mt-5">
                    <Button type="button" onClick={() => navigate("/admin/companies")} variant="outline">Cancel</Button>
                    {
                        (!loading) ? <Button type="submit">Create</Button> : <Button type="submit"><Loader2 className="animate-spin mr-2" /> Please wait</Button>
                    }
                </div>
                
            </form>
        </div>

       

    </div>
  )
}
