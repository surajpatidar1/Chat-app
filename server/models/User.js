import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile_pic:{
        type:String,
        default:""
    }
},{
    timestamps:true
});

const User =  mongoose.model("User",userSchema);
export default User;