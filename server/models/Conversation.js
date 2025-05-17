
import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        default:""
    },
    videoUrl:{
        type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default:false
    },
    msgBy:{
        type:mongoose.Schema.ObjectId,
        required:true,
         ref:"User"
    }
},
{
    timestamps:true
}) ;

const Message = mongoose.model("Message",MessageSchema);


const convSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    receiver:
         {type:mongoose.Schema.ObjectId,
        required:true,
         ref:"User"
    },
    message:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Message"
        }
    ]
},{
    timestamps:true
});

const Talk = mongoose.model("Conversation",convSchema);
export default {Talk,Message};