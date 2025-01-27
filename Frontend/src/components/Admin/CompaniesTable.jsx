import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAllCompanies } from '@/redux/companySlice'

export default function CompaniesTable() {
    let allCompanies = useSelector((state) => state.company.allCompanies);
    let [filterCompany , setFilterCompany] = useState(allCompanies);
    let navigate = useNavigate();
    let textToFilterCompany = useSelector((state) => state.company.textToFilterCompany);
    let dispatch = useDispatch();

    useEffect(() => {
        let filteredCompany = allCompanies.filter((company) => {
            return company?.name?.toLowerCase().includes(textToFilterCompany.toLowerCase()) || textToFilterCompany == "";
        })

        setFilterCompany(filteredCompany);

    } , [textToFilterCompany])

    useEffect(() => {
        setFilterCompany(allCompanies)
    } , [allCompanies])

    return (
        <div>
            {
                filterCompany?.length == 0 ? <span>No Available Companies!</span> : (
                    <>
                        <Table>
                            <TableCaption>A list of your Recent Registered Companies</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    filterCompany?.map((company) => {
                                        return (
                                        <TableRow key={company?._id}>
                                            <TableCell className="font-medium text-left">
                                                <Avatar className=''>
                                                    <AvatarImage className='w-[50px] h-[50px] rounded-full' src={`${company?.logo}`} alt='Om'></AvatarImage>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell className="text-left">{company?.name}</TableCell>
                                            <TableCell className="text-left">{company?.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className="text-right">
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal />
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <div className="flex gap-2 cursor-pointer" onClick={() => navigate(`/admin/companies/update/${company?._id}`)}>
                                                            <Edit2 />
                                                            <span>Edit</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </TableRow>
                                    )
                                    
                                    })
                                }
                            </TableBody>
                        </Table>

                    </>
                )
            }


        </div>
    )
}
