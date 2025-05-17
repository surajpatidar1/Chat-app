 import User from '../models/User.js'
export const searchUser = async(req,res)=>{
    try {
        
        const {search} = req.body
        const query = new RegExp(search,"i","g")

        const user = await User.find({
            "$or": [
                {name: query },
                {email : query}
            ]
        }).select("-password")

        return res.json({Success:true,message:"All users",data:user})
    } catch (error) {
        return res.json({Success:false,message:error.message})
    }
}