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
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

export default function AppliedJobTable() {
    let allApplicationOfAUser = useSelector((state) => state.application.allApplicationOfAUser);

    return (
        <div>
            <Table>
                <TableCaption>A list of your Applied Jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicationOfAUser.map((application) => {
                            return <TableRow key={application._id}>
                                     <TableCell className="text-left">{application?.createdAt?.split("T")[0]}</TableCell>
                                     <TableCell className="text-left">{application?.job?.title}</TableCell>
                                     <TableCell className="text-left">{application?.job?.companyId?.name}</TableCell>
                                     <TableCell className="text-right">
                                        {
                                            (application.status == "pending") ? <Badge className="bg-gray-500">Pending</Badge> : (application.status == "rejected") ? <Badge className="bg-red-400">Rejected</Badge> : <Badge className="bg-green-400">Accepted</Badge>
                                        }
                                     </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>

        </div>
    )
}
