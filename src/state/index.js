import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
    token:null,
    serviceProvidersFeed:[],
    userServiceList:null,
    isLoading:false,
    profilePictureURL:null,
    redirectPath:"home"
}

const slice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.userServiceList = action.payload.userServiceList;
        },
        setIsLoading:(state)=>{
            state.isLoading = !state.isLoading
        },
        setServiceProvidersFeed:(state,action)=>{
            console.log(action.payload)
            state.serviceProvidersFeed = action.payload.data
        },
        setLogout:(state)=>{
            state.user = null;
            state.token = null;
            state.profilePictureURL = null;
        },
        setUser:(state,action)=>{
            state.user = action.payload.updatedUser;
        },
        setProfilePictureURL:(state,action)=>{
            state.profilePictureURL = action.payload;
        },
        setUserServiceList:(state,action)=>{
            state.userServiceList = action.payload;
        },
        setRedirectpath:(state,action)=>{
            state.redirectPath = action.payload;
        }
    }
})

export default slice.reducer;
export const {setLogin,setServiceDetails,setServiceProvidersFeed,setLogout,setIsLoading,setUser,setProfilePictureURL,setUserServiceList,setRedirectpath} = slice.actions;