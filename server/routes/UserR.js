import express from 'express'
import {register,login, logout, changePassword, sendotp, update} from "../controller/UserC.js"
import { auth } from '../Middleware.js';
import  multer  from'multer'
import {storage} from '../cloud/cloudConfig.js'
import { details } from '../controller/Userdetails.js';
import { searchUser } from '../controller/Search.js';
const upload = multer({ storage });


export const  userRouter = express.Router();

userRouter.post("/register",upload.single("profile_pic"),register);
userRouter.post("/login",login);
userRouter.post("/logout",logout);
userRouter.post("/forgetpwd",auth,changePassword);
userRouter.post("/otp",sendotp);
userRouter.post("/update",auth,update);
userRouter.get("/detail",auth,details)
userRouter.post("/search",searchUser)
userRouter.get("/dashboard", auth, (req, res) => {
    res.json({ success: true, message: "Protected route", user: req.user });
  });
