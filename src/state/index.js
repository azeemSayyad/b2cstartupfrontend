import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
    token:null,
    profilePictureURL:null,
}

const slice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            console.log(action.payload);
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.profilePictureURL = action.payload.profilePictureURL
        }
    }
})

export default slice.reducer;
export const {setLogin} = slice.actions;