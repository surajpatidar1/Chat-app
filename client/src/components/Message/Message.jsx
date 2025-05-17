import React, {  useEffect, useState } from 'react';
import './Message.css';
import {useSelector} from "react-redux"
import {Link,useParams} from 'react-router-dom'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { FaRegImages } from "react-icons/fa6";
import { IoIosVideocam } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const Message = () => {

const parms = useParams()
const userId = parms.id
const socketConnection  = useSelector(state=>state.user.socketConnection);
const user = useSelector(state=>state.user)
const [popup,setPopup] = useState(false);
const [userData,setUserData] = useState({
name:'',
email:'',
profile_pic:'',
online:null
});


//message data
const [message,setMessage] = useState({
  text:"",
  imageUrl:"",
  videoUrl:"",
  seen:false
});

//handles 
const handleToggle = () => setPopup(prev => !prev);

const handleuploadimg = (e)=>{
  const file = e.target.files[0];
  setMessage(prev => ({ ...prev, imageUrl: file }));
};

const handleuploadvid = (e)=>{
  const file = e.target.files[0];
  setMessage(prev => ({ ...prev, videoUrl: file }));
};

 const handlechange = (e)=>{
  const value = e.target.value
    setMessage(prev=>({...prev,text:value }));
 };
  
 const handleSubmit = (e)=>{
  e.preventDefault();
  if(message.text || message.imageUrl || message.videoUrl){
    if(socketConnection){
      socketConnection.emit('new message',{
        sender: user.id,
        receiver: userId,
        text: message.text,
        imageUrl: message.imageUrl,
        videoUrl: message.videoUrl,
        msgBy:user.id
      })
    }
  }
  }


useEffect(() => {
if (!socketConnection) return;

socketConnection.emit('message', userId);

const handleUserDetail = (data) => {
  setUserData(data);
};
socketConnection.on("UserDetail", handleUserDetail);

return () => {
  socketConnection.off("UserDetail", handleUserDetail);
};
},[socketConnection, userId]);

return (
  <>
  {userData.name && (
  <div className="flex flex-col h-screen w-full bg-transparent text-gray-800">
    {/* Header */}
    
      <div className="bg-blue-200/90 w-full h-16 flex justify-between items-center px-4 relative shadow">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <IoIosArrowBack size={24} />
          </Link>
          <div className="relative">
            <img src={userData.profile_pic} alt="" className="w-10 h-10 rounded-full" />
            {userData.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <p className="text-lg font-bold absolute bottom-4">{userData.name}</p>
            <p className="text-xs absolute bottom-1">
              {userData.online ? <span className='text-blue-400'>Online</span> :<span className='text-slate-500'>Offline</span> }
            </p>
          </div>
        </div>
        <HiOutlineDotsVertical className="cursor-pointer" size={20} />
      </div>
    

    {/* Messages Section */}
    <div className="flex-1 p-4 overflow-y-auto">
 
    </div>

    {/* Input section */}
    <section className="p-4 bg-blue-200/90 flex items-center gap-2 border-2">
        <div className='relative '>
            <button className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-white hover:text-primary hover:text-blue-500'>
                   <MdAdd size={18} onClick={handleToggle} title='Image'/>
                </button>
        </div>
     {/* video and image*/ }
     {
         popup &&
     
     <div className='bg-white shadow rounded absolute bottom-16 w-36 p-2 '>
           <form >
                  <label  
                       htmlFor='image' 
                        className='flex items-center px-3 p-2 gap-1 cursor-pointer hover:bg-slate-200 rounded'>
                          <div className='text-blue-400 '>
                            <FaRegImages size={25}/>
                          </div>
                         <p>Image</p>
                  </label>
                  <label
                       htmlFor='video'
                       className='flex items-center px-3 p-2 gap-1 cursor-pointer hover:bg-slate-200 rounded'>
                      <div className='text-purple-400'>
                        <IoIosVideocam size={25}/>
                       </div>
                      <p>Video</p>
                  </label>
                  <input
                     type="file" 
                     id='image'
                     className='hidden'
                     onChange={handleuploadimg}
                  />
                  <input 
                     type="file" 
                     id='video'
                     className='hidden' 
                     onChange={handleuploadvid}
                  />
             </form>
      </div>
    }

    {/*input box*/ }
    <form  className='w-full h-full flex gap-2' onSubmit={handleSubmit} >
    
      <input 
          type="text"
          placeholder='Write Something...' 
          className='py-2 px-4 outline-none w-full h-full rounded'
          value={message.text}
          onChange={handlechange}
          />
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transition duration-200"
              type='submit'>
              <IoSend size={20} />
               </button>

    </form>
   
    </section>
  </div>
)}
  </>
);

};

export default Message;  
