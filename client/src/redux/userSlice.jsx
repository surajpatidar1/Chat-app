import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    name: "",
    email: "",
    password: "",
    profile_pic: "",
    onlineUser:[],
    socketConnection:null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profile_pic = action.payload.profile_pic;  
        },
        setOnlineUser:(state,action)=>{
            state.onlineUser = action.payload
        },
        setSocketConnection:(state,action)=>{
            state.socketConnection = action.payload
        },
        clearuser : (state)=>{
            state.id = "";
            state.name= "";
            state.email= "";
            state.password= "";
            state.profile_pic="";
            state.socketConnection= null;
            state.onlineUser=[]
        }
    }
});


export const { setUser,setOnlineUser,clearuser ,setSocketConnection} = userSlice.actions;
export default userSlice.reducer;
