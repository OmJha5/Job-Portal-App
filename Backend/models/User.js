import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        enum : ["student" , "recruiter"],
        required : true,
    },
    profile : {
        bio : {type : String},
        skills : [{type : String}],
        resume : {type : String}, // URL to resume file
        resumeOriginalName : {type : String},
        company : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Company",
        },
        profilePhoto : {
            type : String,
            default : "",
        }
    }

},{timestamps : true})

let User = mongoose.model("User" , userSchema)
mongoose.exports = User