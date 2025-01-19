import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export let register = async (req , res) => {
    try{
        const {name , email , phoneNumber , password , role} = req.body;
        if(!name || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message : "User already exist with this email",
                success : false,
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        await User.create({
            name , email , phoneNumber , password : hashedPassword , role,
        })

        return res.status(200).json({
            message : "Account Created Successfully!",
            success : true,
        })
    }
    catch(e){
        console.log(e)
    }
}

export let login = async (req , res) => {
    try{
        const {email , password , role} = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
                message : "Something is missing!",
                success : false
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "Incorrect Email Or Password!",
                success : false,
            })
        }

        console.log(user);
        let status = await bcrypt.compare(password , user.password)
        console.log("Here we have---------------- " + status);
        if(!status){
            return res.status(400).json({
                message : "Incorrect Email Or Password!",
                success : false,
            })
        }

        // Check if role is correct or not
        if(role != user.role){
            return res.status(400).json({
                message : "Account Does not exist with the current Role!",
                success : false,
            })
        }

        const tokenData = {
            userId : user._id
        }

        const token = jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn : "1d"})

        user = {
            _id : user._id,
            name : user.name,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile,
        }
        
        return res.status(200).cookie("token" , token , {maxAge : 1 * 24 * 60 * 60 * 1000 , httpsOnly:true , sameSite:"strict"}).json({
            message : `Welcome Back ${user.name}`,
            user: user,
            success : true
        })
    }
    catch(e){
        console.log(e)
    }
}

export let logout = async (req , res) => {
    try{
        res.status(200).cookie("token" , "" , {maxAge:0}).json({
            message : "Logged Out Successfully!",
            success : true
        })
    }
    catch(e){
        console.log(e)
    }
}

export let updateProfile = async(req , res) => {
    try{
        const {name , email , phoneNumber , bio , skills} = req.body
        const file = req.file

        let skillsArray;
        if(skills) skillsArray = skills.split(",");

        const userId = req.id; 
        let user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                message : "User Not Found",
                success : false
            })
        }

        // Updating the users information.
        if(name) user.name = name
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        // Resume comes later here.

        await user.save();

        user = {
            _id : user._id,
            name : user.name,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile,
        }

        return res.send(200).json({
            message : "profile updated Successfully",
            user : user,
            success : true,
        })
    }
    catch(e){
        console.log(e)
    }
}
