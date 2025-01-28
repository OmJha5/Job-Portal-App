import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Eak specific job application mai apply karna 
export const applyJob = async (req , res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message : "Job id is required",
                success : false
            })
        }

        // Check if the uesr has already applied for the job
        const existingApplication = await Application.findOne({job : jobId , applicant : userId});
        if(existingApplication){
            return res.status(400).json({
                message : "You have already applied for this jobs",
                success : false
            })
        }

        // Check if the jobs exist
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message : "Job Not Found",
                success : false
            })
        }

        // Create a new Application
        const newApplication = await Application.create({
            job : jobId,
            applicant : userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message : "Job applied successfully",
            job,
            success : true
        })
    }
    catch(e){
        console.log(e);
    }
}

// Eak user ne jitte bhi job applications mai apply kara hai 
export const getAppliedJobs = async(req , res) => {
    try{
        const userId = req.id;
        const application = await Application.find({applicant : userId}).sort({createdAt : -1}).populate({
            path : "job",
            populate : {
                path : "companyId",
            }
        }); 

        if(application.length == 0){
            return res.status(404).json({
                message : "No application found",
                success : false
            })
        }

        return res.status(200).json({
            application,
            success : true
        })
        

    }
    catch(e){
        console.log(e);
    }
}

// Kitte user ne eak specific job pe apply kara hai 
export const getApplicants = async(req , res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : "applications",
            options : {sort : {createdAt : -1}},
            populate : {
                path : "applicant"
            }
        })

        if(!job){
            return res.status(404).json({
                message : "Job not found",
                success : false
            })
        }

        return res.status(200).json({
            job,
            success : true
        })
    }
    catch(e){
        console.log(e);
    }
}

export const updateStatus = async(req , res) => {
    try{
        let {status} = req.body;
        let applicationId = req.params.id;
        
        if(!status) {
            return res.status(404).json({
                message : "Status is required",
                success : false
            }) 
        }

        status = status.toLowerCase();

        if(status != "pending" && status != "accepted" && status != "rejected"){
            return res.status(404).json({
                message : "Enter Valid Status for the application",
                success : false
            })
        }

        // Find the application by application id
        let application = await Application.findById(applicationId)
        if(!application) {
            return res.status(404).json({
                message : "Application not found",
                success : false
            }) 
        }

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message : "Status updated successfully",
            success : true
        })
    }
    catch(e){
        console.log(e);
    }
}