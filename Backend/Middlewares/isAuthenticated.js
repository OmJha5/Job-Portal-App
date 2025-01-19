import jwt from "jsonwebtoken"

const isAuthenticated = async (req , res , next) => {
    try{
        let token = req.cookie.token

        if(!token){
            return res.status(401).json({
                message : "User not Authenticated!",
                success : false
            })
        }

        const decode =  jwt.verify(token , process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message : "Invalid Token",
                success : false
            })
        }

        req.id = decode.userId;
        next();
    }
    catch(e){
        console.log(e);
    }
}

export default isAuthenticated