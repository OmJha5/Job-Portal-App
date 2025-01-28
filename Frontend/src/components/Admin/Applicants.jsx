import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { setAllApplicationOfAJob } from '@/redux/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Application_API_ENDPOINT } from '@/utils/endpoint'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Applicants() {
    let applicantStatus = ["Accepted" , "Rejected"];
    let allApplicationOfAJob = useSelector((state) => state.application.allApplicationOfAJob);
    let dispatch = useDispatch();
    let params = useParams();
    let jobId = params.id;

    useEffect(() => {   

        let getAllApplicationsOfThisJob = async () => {
            try {
                let res = await axios.get(`${Application_API_ENDPOINT}/${jobId}/applicants`, { withCredentials: true });

                if (res.data.success) {
                    let applications = [];
                    res.data.job.applications.map((application) => applications.push(application));
                    dispatch(setAllApplicationOfAJob(applications));
                }
            }
            catch (e) {
                console.log(e);
            }
        }

        getAllApplicationsOfThisJob();
    }, [])
    return (
        <div>
            <Navbar />

            <div className='max-w-7xl m-auto my-10'>
                <h1 className="font-bold text-3xl mb-5">Applications({allApplicationOfAJob.length})</h1>

                <ApplicantsTable />
            </div>
        </div>
    )
}
