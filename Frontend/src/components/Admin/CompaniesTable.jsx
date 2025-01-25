import React from 'react'
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
import { Edit2, MoreHorizontal, MoveHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function CompaniesTable() {
    let allCompanies = useSelector((state) => state.company.allCompanies);

    return (
        <div>
            {
                allCompanies.length == 0 ? <span>No Available Companies!</span> : (
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
                                    allCompanies.map((company) => {
                                        return <>
                                            <TableRow>
                                                <TableCell className="font-medium text-left">
                                                    <Avatar className=''>
                                                        <AvatarImage className='w-[50px] h-[50px] rounded-full' src={`${company.logo}`} alt='Om'></AvatarImage>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell className="text-left">{company.name}</TableCell>
                                                <TableCell className="text-left">{company.createdAt.split("T")[0]}</TableCell>
                                                <TableCell className="text-right">
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <MoreHorizontal />
                                                        </PopoverTrigger>
                                                        <PopoverContent className='my-4'>
                                                            <div className="flex gap-2 cursor-pointer">
                                                                <Edit2 />
                                                                <span>Edit</span>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                            </TableRow>
                                        </>
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
