import mongoose from "mongoose";

 export const db = async ()=>{
   await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Database connected...*"))
    .catch((err)=>(err));
    
}
