import { createSlice } from "@reduxjs/toolkit";

const DefaultProfileSlice = createSlice({
    name : "default-profile",
    initialState : {
        profileURL : null,
        name : null,
        email : null
    },
    reducers:{
        setProfileURL : (state , action) => {
            state.profileURL = action.payload
        },
        setName : (state , action) => {
            state.name = action.payload
        },
        setEmail : (state , action) => {
            state.email = action.payload
        },
    }
})

export const { setProfileURL , setName , setEmail } = DefaultProfileSlice.actions;

export default DefaultProfileSlice.reducer;