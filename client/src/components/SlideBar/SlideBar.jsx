import React, { useContext, useState } from 'react';
import './SlideBar.css';
import { LuMessageCircleMore } from "react-icons/lu";
import { FaUserTimes, FaUserCircle } from 'react-icons/fa';
import { RiLogoutCircleLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from '../SearchUser/SerachUser';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearuser } from '../../redux/userSlice';

const SlideBar = () => {
  const { setShowProfile,openSearchUser,setOpenSearchUser ,url,isonline} = useContext(StoreContext);
  const user = useSelector(state => state.user);
  const [allUser,setAllUser] = useState([]);
  const dispatch = useDispatch();

const handleLogout = async()=>{

  try {
    const response = await axios.post(`${url}/Talksy/user/logout`,{}, {withCredentials: true});

    if(response.data.Success){
      dispatch(clearuser());
      localStorage.clear();
      toast.success(response.data.message);
         
    }
    else{
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Error!!")
  }
  
}
  return (
    <div className="margin flex h-screen w-full bg-white">
      {/* Sidebar */}
      <div className="w-16 bg-slate-100 py-5 text-slate-600 flex flex-col justify-between items-center">
        {/* Top icons */}
        <div className="flex flex-col gap-3 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200 ${
                isActive ? "bg-slate-400" : ""
              }`
            }
            title="Chat"
          >
            <LuMessageCircleMore size={22} />
          </NavLink>

          <div
            className="w-12 h-12 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200"
            title="Add friend"
          >
            <FaUserTimes size={20} onClick={()=>setOpenSearchUser(true)} />
          </div>
        </div>

        {/* Bottom icons */}
        <div className="flex flex-col gap-3 items-center">
          {user.profile_pic ? (
            <div
              className="w-12 h-12 flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-200 relative"
              title="Profile"
              onClick={() => setShowProfile(true)}
            >
              <img
                src={user.profile_pic}
                className="rounded-full w-8 h-8 object-cover"
                alt="Profile"
              />
              {
              isonline && (<span className="absolute bottom-2 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>)
            }
            </div>
          ) : (
            <div
              className="w-12 h-12 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200"
              onClick={() => setShowProfile(true)}
              title="Profile"
            >
              <FaUserCircle size={20} />
            </div>
          )}

          <div
            className="w-12 h-12 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200"
            title="Logout"
          >
            <RiLogoutCircleLine onClick={handleLogout} size={20} />
          </div>
        </div>
      </div>

      <div className='w-60 h-full '>
        <div className='h-16 flex items-center'>
        <h2 className='text-x1 font-bold p-4 text-slate-800 h-16 '>Message</h2>
        </div>
        <div className='bg-slate-200 p-[0.5px]'>

        </div>
        <div className=' h-[calc(100vh-62px)] overflow-x-hidden overflow-y-auto scrollbar'>
          {
            allUser.length === 0 && (
              <div className='mt-12'>
                <div className='flex justify-center items-center my-4 text-slate-500'>
                <FiArrowUpLeft size={50}/>
                </div>
                <p className='text-lg text-center text-slate-600'>Explore users to start a conversation with.</p>
              </div>
            )
          }
        </div>
      </div>
     {
      openSearchUser?<SearchUser/>:<></>
     }
     
    </div>
  );
};

export default SlideBar;
