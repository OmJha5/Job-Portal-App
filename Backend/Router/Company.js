import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { getAllByCurr, getCompanyById, updateCompany , createCompany , getAll } from "../Controller/Company.js";
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();

router.route("/createCompany").post(isAuthenticated , singleUpload , createCompany)
router.route("/getCurr").get(isAuthenticated , getAllByCurr)
router.route("/get").get(isAuthenticated , getAll);
router.route("/get/:id").get(isAuthenticated , getCompanyById)
router.route("/update/:id").post(isAuthenticated, singleUpload , updateCompany)

export default router;