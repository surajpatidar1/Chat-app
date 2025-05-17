import React, { useContext, useState } from 'react'
import './Login.css'
import Logo from '../../components/Logo/Logo'
import { StoreContext } from '../../store/Store'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setUser} from '../../redux/userSlice'

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {url} = useContext(StoreContext)
  const [currState,setCurrState] = useState("Log in");
  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    profile_pic:""
  });

  const handlechange = (event)=>{
    const {name,value} = event.target;
    setForm((prev=>({...prev,[name]:value})));
    }

    const handleimage = (e) => {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, profile_pic: file }));
    };
    

    const handleSubmit = async(e)=>{
      e.preventDefault();
      e.stopPropagation(); 

      const formData = new FormData();
     formData.append('name',form.name);
    formData.append("email",form.email);
    formData.append("password",form.password);

        
        if (form.profile_pic && typeof form.profile_pic !== "string") {
          formData.append("profile_pic", form.profile_pic);
        }   

    const loginendpoint = "/Talksy/user/login"
    const registerendpoint =  "/Talksy/user/register"
    
try {

  let response;
  if(currState === "Log in"){
    response = await axios.post(`${url}${loginendpoint}`,
      {email:form.email,password:form.password}, {withCredentials: true} );
  }
  else{
    response = await axios.post(`${url}${registerendpoint}`,
      formData,{ headers: {'Content-Type': 'multipart/form-data' }, withCredentials: true });
    
  }

  
 const {Success,message,user} = response.data;
  if(Success){
    toast.success(message);
    localStorage.setItem("token", user.token);
    dispatch(setUser(user));
    navigate("/")
    toast.info(`Welcome back ${user.name}`)

  }
  else{
    toast.error(message);
  }
  setForm({
    name:"",
    email:"",
    password:"",
    profile_pic:""
  });
 
} catch (error) {
    console.error(error)
}

     
    } 
  
  return (
    <>
    <div className="containerlog">
    <Logo/>
  
  <form className='form' onSubmit={handleSubmit} >
  <h1 className='cs'> {currState}</h1>
  {currState==="Sign up"
  ?<div> 
    <input 
  onChange={handlechange}
   type="text"
   name='name'
   value={form.name}
   placeholder='Your name'
   required />
<br />
   <input 
   onChange={handlechange}
    type="email"
    name='email'
    value={form.email}
    placeholder='Your email' 
    required/>
<br />
    <input
    onChange={handlechange}
     type="text"
     name='password'
     value={form.password}
     placeholder='Enter password' 
     required/>
<br />
<label htmlFor="profile_pic" className='flex justify-center items-center' title='Profile'>
  <p><img src="/upload.png" alt="" /></p>
</label>
     <input 
     onChange={handleimage}
     type="file" 
     id='profile_pic'
     name='profile_pic'
     className='pic hidden'
   /></div>:<div>
   <input 
   onChange={handlechange}
    type="email"
    name='email'
    value={form.email}
    placeholder='Your email' 
    required/>
<br />
    <input
    onChange={handlechange}
     type="text"
     name='password'
     value={form.password}
     placeholder='Enter password' 
     required/>
      <p onClick={()=>navigate("/reset")}>Forget password? | <strong >Reset now</strong></p>
     </div> }
  
  
    
<br />         
        <p onClick={()=>setCurrState("Log in")}>Already have account? |<strong>Log in</strong></p>
        <p onClick={()=>setCurrState("Sign up")}>Don't have account? |<strong>Create account</strong></p>
        
        <button className='btn-login'>{currState === "Sign up"?"Sign up":"Log in"}</button>
  </form>
 
    </div>
    
    </>
   
  )
}

export default Login
