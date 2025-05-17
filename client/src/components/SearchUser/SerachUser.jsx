import React, { useContext, useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { StoreContext } from '../../store/Store';
import { IoMdSearch } from "react-icons/io";
import UsersCard from '../UserCard/UsersCard';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';


const SerachUser = () => {

  const {setOpenSearchUser,url } = useContext(StoreContext);
  const [searchUser,setSearchUser] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("")

  const onlineUser = useSelector(state=>state.user.onlineUser)

  const handleSearchUser = async()=>{
      try {
        
        const response = await axios.post(`${url}/Talksy/user/search`,{search: search});

        if(response.data.Success){
          setLoading(false);
          setSearchUser(response.data.data);
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }
       
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(()=>{
handleSearchUser();
  },[search]);


  return (
    <>
 
    
     <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40'>
     <div className='flex justify-end p-4 '>
    <IoClose size={25} onClick={() => setOpenSearchUser(false)} className="cursor-pointer relative top-20 right-40" />
  </div>
      <div className='w-full max-w-lg mx-auto mt-10'>

      
     <div className='bg-white rounded h-12 overflow-hidden flex '>
     <input
         type="text" 
         name='search'
         placeholder='Search ' className='w-full outline-none py-1 h-full px-4'
         onChange={(e)=>{setSearch(e.target.value)}}
         value={search}/>
     
     <div className='w-14 h-14 flex justify-center items-center ' title='Search'>
   <IoMdSearch size={30}/>
     </div>
     </div>

     {/** display search user */}
     <div  className='bg-white mt-2 w-full p-4 rounded'>
{
  searchUser.length === 0 && !loading?
  <p className='text-center text-slate-500'>No user found !</p>:<></>
}

{
  loading &&
    <Loader/>    
}

{
   searchUser.length !==0 && !loading ?
   searchUser.map((user,index)=>{ 
    return(<UsersCard key={user._id} user={user} onlineUser={onlineUser} />)
   })
   :<></>
}
     </div>

      </div>
      
    </div>
    </>
   
  )
}

export default SerachUser
