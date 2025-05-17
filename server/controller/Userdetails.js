import User from "../models/User.js";

 export const details = async(req,res)=>{

    try {
        
        const {id}  = req.user.data;
    const {token} = req.user.token
    
 
    const user = await User.findById(id);

    if(!user){
        return res.json({Success:false,message:"User not found !"})
    }
    const data = 
     {
       name:user.name,
        email:user.email,
        profile_pic:user.profile_pic,
        token:token
    };

    return res.json({Success:true,message:data});
    } catch (error) {
        console.log(error);
     return res.json({Success:false,message:error});
    }
    
}


