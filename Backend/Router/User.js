import express from "express";
import { register , updateProfile , logout , login} from "../Controller/User.js"
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload , register)
router.route("/login").post(login)
router.route("/profile/update").post(isAuthenticated , updateProfile)
router.route("/logout").get(logout)

export default router;