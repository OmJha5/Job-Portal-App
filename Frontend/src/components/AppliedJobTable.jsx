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

export default function AppliedJobTable() {
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
                    <TableRow>
                        <TableCell className="font-medium text-left">17/03/2025</TableCell>
                        <TableCell className="text-left">Software Engineer</TableCell>
                        <TableCell className="text-left">Google</TableCell>
                        <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    )
}
