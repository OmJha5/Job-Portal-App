import Company from "../models/Company.js"

export let createCompany = async(req , res) => {
    try{
        const {name , description , website , location} = req.body;
        const file = req.file;
        if(!name || !description || !website  || !location){
            return res.status(400).json({
                message : "Please enter the required fields",
                success : false,
            })
        }

        let company = await Company.findOne({name : name});
        if(company){
            return res.status(400).json({
                message : "You Can't register same company",
                success : false
            })
        }

        company = await Company.create({
            name , description , website , location , logo : file?.path , userId : req.id
        })

        return res.status(200).json({
            message : "Company Created Successfully!",
            company,
            success : true,
        })
    }
    catch(e){
        console.log(e);
    }
}

export let getAllByCurr = async(req , res) => {
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
            success : true,
        })

        
    }
    catch(e){
        console.log(e);
    }
}

export let getAll = async (req , res) => {
    try{
        let companies = await Company.find({});
        return res.status(200).json({
            companies , 
            success : true,
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
        let currCompany = await Company.findById(req.params.id);
        let owner = currCompany.userId;
        let currUser = req.id;

        if(owner.toString() != currUser.toString()) {
            return res.status(404).json({
                message : "You can't edit this company",
                success : false,
            })
        }

        const updateData = {name , description , website , location , logo : file?.path}
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