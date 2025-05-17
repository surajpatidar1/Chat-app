import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import models from '../models/Conversation.js';
const { Talk, Message } = models;

dotenv.config();

export function setupSocket(app) {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

 const onlineUser = new Set()

  io.on('connection', async (socket) => {
    console.log(" Connected user:", socket.id);
    
    try {
      const token = socket.handshake.auth?.token; 

      if (!token) {
        throw new Error("No token provided");
      }

      // Verify JWT token
      const user = jwt.verify(token, process.env.SECRETE_KEY);
     
       

       //create room
       
      socket.join(user.id);
      onlineUser.add(user.id) ;

       io.emit('onlineUser',Array.from(onlineUser));
       socket.on('message',async(userId)=>{
       
           const data = await User.findById(userId).select("-password");
           if (!data) {
            return socket.emit("UserDetail", { error: "User not found" });
          }
         
           const payload = {
           
            name:data.name,
            profile_pic:data.profile_pic,
            email:data.email,
            online:onlineUser.has(userId)
           };

           socket.emit("UserDetail",payload);
       })

       //new message
       socket.on("new message",async(data)=>{
        let conversation = await Talk.findOne({
          "$or" :[
            {sender: data.sender, receiver: data.receiver},
            {sender: data.receiver, reciever: data.sender,},
          ]
        })
       
        //if not available
        if(!conversation){
          const createConversation = await Talk({
            sender: data.sender,
            receiver: data.receiver
          })
          conversation = await createConversation.save();
        }
          const message = new Message({
            text:data.text,
            imageUrl: data.imageUrl,
            videoUrl: data.videoUrl,
            msgBy:data._id
          });

          const saveMessage = await message.save();

          const updateMessage = await Talk.updateOne({_id: conversation._id},
            {
              "$push" : {message :saveMessage._id}
            })

            const getConversation = await Talk.findOne({
              "$or" :[
                {sender: data.sender, receiver: data.receiver},
                {sender: data.receiver, reciever: data.sender,},
              ]
            }).populate("message").sort({updatedAt:-1})
            console.log("getConversation",getConversation)
       })
    socket.on("disconnect", () => {
      onlineUser.delete(user._id)
      console.log(" Disconnected user:", socket.id);
    });
     

    } catch (err) {
      console.error(" Auth error:", err.message);
      socket.disconnect();
    }

  });

  return server;
}
