import React, { useContext, useEffect } from 'react'
import './Home.css'
import Message from '../../components/Message/Message'
import SlideBar from '../../components/SlideBar/SlideBar'
import Profile from '../../components/Profile/Profile'
import { StoreContext } from '../../store/Store'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setOnlineUser, setSocketConnection } from '../../redux/userSlice'




const Home = () => {


  const {showProfile,url} = useContext(StoreContext);
  const dispatch = useDispatch();
  const location  = useLocation();

  const basepath = location.pathname === "/";
  
 const user = useSelector(state=>state.user)
 

  /**socket connections */
  useEffect(()=>{


  const socketConnection = io(url,{
    auth:{
      token: localStorage.getItem("token")
    }
  })
  
  socketConnection.on("onlineUser",(data)=>{
    dispatch(setOnlineUser(data))
  })
    dispatch(setSocketConnection(socketConnection));
  return ()=>{
    socketConnection.disconnect();
  }
  },[])

  return (
    <>
     <div className='container-home'>
     <div className='home'>
      {showProfile?<Profile/>:<></>}
      <section className={`slider ${!basepath && `hidden`}lg:block`}><SlideBar/></section>
      <section className={`message ${basepath && `hidden`}lg:block`}><Message/></section>
      
      
     </div>
     </div>

    </>
   
  )
}

export default Home
