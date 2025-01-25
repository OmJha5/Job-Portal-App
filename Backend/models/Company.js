import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true,
    },
    website : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    logo : {
        type : String,
        required : true,
    },
    userId : { // kisne yeh company ko create kara hai 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
},{timestamps : true})

const Company = mongoose.model("Company" , companySchema);
export default Company;