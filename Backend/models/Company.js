import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    website : {
        type : String,
    },
    location : {
        type : String,
    },
    logo : {
        type : String,
    },
    userId : { // kispe yeh company ko create kara hai 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
},{timestamps : true})

const Company = mongoose.model("Company" , companySchema);
mongoose.exports = Company;