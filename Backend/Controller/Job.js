import mongoose from "mongoose";
import Job from "../models/Job.js";

// Admin ke liye
export let postJob = async (req , res) => {
    try{
        const {title , description , requirements , salary , location , jobType , experience , position , companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message : "Something is Missing",
                success : false
            })
        }

        if (isNaN(salary)) {
            return res.status(400).json({
                message: "Enter a Valid Salary",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements : requirements.split(","),
            salary : Number(salary),
            location,
            jobType,
            experience,
            position,
            companyId,
            created_by : userId,
        })

        return res.status(200).json({
            message : "New Job Created Successfully!",
            job,
            success : true
        }) 
    }
    catch(e){
        console.log(e);
    }
}

// Student ke liye
export let getAllJobs = async (req , res) => {
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                {title : {$regex : keyword , $options : "i"}},
                {description : {$regex : keyword , $options : "i"}},
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "companyId",
        });
        
        if(jobs.length == 0){
            return res.status(404).json({
                message : "Jobs not found",
                jobs : [],
                success : true
            })
        }
        
        return res.status(200).json({
            jobs,
            success : true
        })

    }
    catch(e){
        console.log(e);
    }
}

// Students ke liye
export const getJobById = async(req , res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : "applications",
        }).populate({path : "companyId"});

        if(!job){
            return res.status(404).json({
                message : "Job Not Found",
                success : false
            })
        }

        return res.status(200).json({job , success : true});
    }
    catch(e){
        console.log(e);
    }
}

// Admin kitte job create kara abhi tak 
export const getAdminJobs = async(req , res) => {
    try{
        let adminId = req.id;
        const jobs = await Job.find({created_by : adminId}).populate({
            path : "companyId",
        });

        return res.status(200).json({jobs , success : true});
    }
    catch(e){
        console.log(e);
    }
}






