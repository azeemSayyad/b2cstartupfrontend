import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
    token:null,
    profilePictureURL:null,
    serviceDetails:null
}

const slice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.profilePictureURL = action.payload.profilePictureURL
        },
        setServiceDetails: (state,action)=>{
            console.log(action.payload);
            state.serviceDetails = action.payload
        },
        setLogout:(state)=>{
            state.user = null;
            state.token = null;
            state.profilePictureURL = null;
        }
    }
})

export default slice.reducer;
export const {setLogin,setServiceDetails,setLogout} = slice.actions;