import './Profile.css'
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { StoreContext } from "../../store/Store";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbUserOff } from "react-icons/tb";
import { MdModeEdit } from "react-icons/md";

const Profile = () => {
  const {setShowProfile} = useContext(StoreContext);
    const user = useSelector(state => state.user);

  return (
    <>
        <div className='container-profile'>
            
            <div className="content">
            <p className='close'><IoClose size={25} onClick={()=>setShowProfile(false)}/></p>
            <div className="image">
              {user.profile_pic?
                <img src={user.profile_pic} alt="" />:<TbUserOff size={35}/>}
                  
            </div>
            <MdModeEdit size={20} className='edit' title='Edit'/>
            <p className="details">
                <p><FaUser className='icon'/>Name : {user.name}</p>
                
            </p>
            <p className='details'>
                
                <p><MdEmail className='icon'/>Email: {user.email}</p>
            </p>
            </div>
           
           
        </div>
    </>
  
  )
}

export default Profile
