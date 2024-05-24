import express from "express"
import { deleteUser, forgetPassword, getAllUser, getUser, loginUser, registerUser } from '../controllers/user.contorller.js';

const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getall").get(getAllUser);
router.route("/getuser").get(getUser);
router.route("/delete").get(deleteUser);
router.route("/forget").get(forgetPassword);


export default router;
