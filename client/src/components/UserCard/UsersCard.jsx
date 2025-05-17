import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { StoreContext } from '../../store/Store';


const UsersCard = ({user,onlineUser}) => {

  const {setIsOnline} = useContext(StoreContext)
  
  const value = onlineUser.includes(user._id)
  setIsOnline(value) 
  
  
  return (
   <>
   <Link to={`/${user._id}`} className='flex items-center gap-3 mt-3 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-purple cursor-pointer rounded'>
     <div className='relative'>
      <img src={user.profile_pic} alt="" className='w-14 h-12 rounded-full' />
      {
              value && (<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>)
            }
     </div>
     <div className=' font-semibold  '>
      {user.name}
      <p>{user.email}</p>
     </div>
     
   </Link>
   </>
  )
}

export default UsersCard
