import React, { useContext,  useState } from 'react'
import './OTP.css'
import Logo from '../../components/Logo/Logo'
import axios from 'axios'
import { StoreContext } from '../../store/Store'
import { toast } from 'react-toastify'

const OTP = () => {

const [show,setShow] = useState(false);
  const {url} = useContext(StoreContext);

const[form,setForm] = useState({
    email:"",
    password:"",
    otp:""
})

    const handlechange = (event)=>{
        const {name,value} = event.target;
        setForm((prev=>({...prev,[name]:value})));
        }

        
    const handleSubmit = async(e)=>{
      e.preventDefault();
      e.stopPropagation(); 

      const formData = new FormData();
for (let key in form) {
  formData.append(key, form[key]);
}
    
try {
let response
if(!show){
  response = await axios.post(`${url}/Talksy/user/otp`,{email:form.email}, {withCredentials: true});
}
else{
  response = await axios.post(`${url}/Talksy/user/forgetpwd`,{email:form.email,otp:form.otp,password:form.password}, {withCredentials: true});
}
   
  
 const {Success,message} = response.data;
  if(Success){
    toast.success(message);
    setShow(true)
  }
  else{
    toast.error(message);
    setShow(false)
  }
  setForm({
    email:"",
    password:"",
    otp:""
  });
 
} catch (error) {
    console.error(error)
}}
      
  return (
    <>
    
    <div className='container-reset'>
    <Logo/>
      <form className='form' onSubmit={handleSubmit} >
        <h2>Reset Password</h2>
{!show?<div>
          <input 
   onChange={handlechange}
    type="email"
    name='email'
    value={form.email}
    placeholder='Enter email' 
    required/>
<br />

</div>
   :   
<div>

<input 
onChange={handlechange}
    type="email"
    name='email'
    value={form.email}
    placeholder='Enter email' 
    required/>
<input 
   onChange={handlechange}
    type="password"
    name='password'
    value={form.password}
    placeholder='Enter new password' 
    required/>
<br />
  <input 
   onChange={handlechange}
    type="otp"
    name='otp'
    value={form.otp}
    placeholder='Your otp' 
    required/>
    </div>}

<br />

       <button className='submit'>Submit</button>
      </form>
    </div>
    </>
   
  )
}

export default OTP
