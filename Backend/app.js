import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRouter from "./Router/User.js"
import companyRouter from "./Router/Company.js"
import jobRouter from "./Router/Job.js"
import ApplicationRouter from "./Router/Application.js"
dotenv.config({})

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

const corsOptions = {
    origin : "http//localhost:5173",
    credentials : true
}

app.use(cors(corsOptions))


// Api's
app.use("/api/v1/user" , userRouter);
app.use("/api/v1/company" , companyRouter);
app.use("/api/v1/job" , jobRouter);
app.use("/api/v1/application" , ApplicationRouter);

app.listen(port , () => {
    connectDB()
    console.log(`Server running at port ${port}`);
})