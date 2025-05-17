import  { useState, createContext } from 'react'

export const StoreContext = createContext(null);
const Store = (props) => {

    const url = "http://localhost:1000";
    const [showProfile,setShowProfile] = useState(false);
    const [openSearchUser,setOpenSearchUser] = useState(false);
    const [isonline,setIsOnline] = useState(false)
   


   const values = {
                   url,showProfile,setShowProfile,
                   openSearchUser,setOpenSearchUser,
                 isonline,setIsOnline
                  };
                   

  return (
   <>
   <StoreContext.Provider value={values}>
    {props.children}
   </StoreContext.Provider>

   </>
  )
}

export default Store
