import user from '../models/User.js';
import bcrypt from "bcrypt";
import pkg from 'jsonwebtoken';
import code from './otps.js'


const {sign} = pkg



const register = async(req,res)=>{

    const salt = 10;
    const {name,email,password} = req.body;
    const file = req.file;

   
    const existinguser = await user.findOne({email});

    if(existinguser){
        res.json({Success:false,message:"User already exist"});
    }

    const hashedPassword = await bcrypt.hash(password,salt);
    const newuser = new user(
        {
            name,
            profile_pic:file.path,
            email,
            password:hashedPassword
        });
    try {
        await newuser.save();
       return res.json({Success:true,message:"Register Successfully"});
    } catch (error) {
       return res.json({Success:false,message:"Something went wrong !"})
    }
};



const login = async(req,res)=>{
    const {email,password} = req.body;
    
  
    const User = await user.findOne({email});
    if(!User){
        return res.json({Success:false,message:"Invalid Email!"})
    }

    const check = await bcrypt.compare(password,User.password);
  
    if(!check){
       return res.json({Success:false,message:"User not found"});
    }

    //playload that contain user data
    const playload = {
        id:User.id,
        email:User.email,
        name:User.name,
        profile_pic:User.profile_pic
    }

   //token genration
   const token  = sign(playload
    ,process.env.SECRETE_KEY,{expiresIn:"1d"});
console.log(process.env.SECRETE_KEY)
   res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    maxAge: 24 * 60 *60*1000,
   });

  return res.json({
    Success:true,
    message:"Login Successfully",
       user:{
            id:User.id,
            name:User.name,
            email:User.email,
            profile_pic:User.profile_pic,
            token:token
}});

};



const logout = async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:true
        });
        return res.json({Success:true,message:"Logout Successfully"});
        
    } catch (error) {
        console.log(error);
      return  res.json({Success:false,message:"something went wrong !!"})
    }
   
};



const sendotp = async(req,res)=>{

    const {email} = req.body;
    console.log(email)
    const existingEmail = await user.findOne({email})
    if(!existingEmail){
       return res.json({Success:false,message:"Email not found"});
    }

    const OTP = Math.floor(10000 + Math.random() * 90000);
    console.log(OTP)
    try {
      code.otps.push({email:existingEmail.email,otp:OTP});
        return res.json({Success:true,message:OTP});
    } catch (error) {
       return res.json({Success:false,message:"Server not working !"});
    }
};




const changePassword = async(req,res)=>{
    try {
const {email,password,otp} = req.body;
const salt = 10;
const check = await user.findOne({email});

if(!check){
   return res.json({Sucess:true,message:"Email not matched !"})
}

if(!password){
    return res.json({Success:false,message:"Enter password !"})
}

const hashed = await bcrypt.hash(password,salt);

const matchedOtpEntry = code.otps.find(o => o.email === email);

    if(matchedOtpEntry.otp!== otp){
       return res.json({Success:false,message:"Invaild OTP"})
    }
    check.password = hashed;
    await check.save();
 return res.json({Success:true,message:"Password changed Successfully"});


} catch (error) {
    console.log(error);
   return res.json({Success:false,message:"Something went wrong !"})
}
}


const update = async(req,res)=>{

    const token = req.user.id;
    const {name,email,profile_pic}= req.body;

   if(!token){
    return res.json({Success:false,message:"User not found"})
   }

   const data = await user.find({token});

   if(!data){
    return res.json({Success:false,message:"User not found"})
   };
  try {

    if(name){
        data.name = name;
        return res.json({Success:true,message:"Name updated"})
    }
    if(email){
        data.email = email;
        return res.json({Success:true,message:"Email updated"})
    }
    if(profile_pic){
        data.profile_pic = profile_pic;
        return res.json({Success:true,message:"Profile updated"})
    }
    
    await data.save();
    return res.json({Success:true,message:""})
  } catch (error) {
    return res.json({Success:false,message:"Something went wrong !"});
  }

}

export  {register,login,logout,sendotp,changePassword,update};

