import Company from "../models/Company.js"

export let registerCompany = async (req , res) => {
    try{
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message : "Company Name is Required",
                success : false
            })
        }

        let company = await Company.findOne({name : companyName});
        if(company){
            return res.status(400).json({
                message : "You Can't register same company",
                success : false
            })
        }

        company = await Company.create({
            name : companyName,
            userId : req.id
        })

        return res.status(201).json({
            message : "Company Registered Sucessfully",
            company : company,
            success : true
        })
    }
    catch(e){
        console.log(e);
    }
}

export let getCompany = async(req , res) => {
    try{
        const userId = req.id;
        const companies = await Company.find({userId}); // Woh saari company jisko yeh user ne create kara hai 
        if(companies.length == 0){
            return res.status(404).json({
                message : "Companies Not Found",
                success : false
            })
        }

        return res.status(200).json({
            companies,
        })

        
    }
    catch(e){
        console.log(e);
    }
}

export let getCompanyById = async (req , res) => {
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message : "Company Not Found",
                success : false
            })
        }

        return res.status(200).json({
            company : company,
            success : true,
        })
    }
    catch(e){
        console.log(e);
    }
}

export let updateCompany = async (req , res) => {
    try{
        const {name , description , website , location} = req.body;
        const file = req.file;

        const updateData = {name , description , website , location}
        const company = await Company.findByIdAndUpdate(req.params.id ,updateData , {new : true} );

        if(!company){
            return res.status(404).json({
                message : "Company Not Found",
                success : false,
            })
        }

        return res.status(200).json({
            message : "Company Information updated",
            company : company,
            success : true
        })
    }
    catch(e){
        console.log(e);
    }
} 