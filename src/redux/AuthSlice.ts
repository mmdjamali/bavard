import { Slice, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name : "auth",
    initialState : {
        pending : false,
        user : null,
        profile : null
    },
    reducers:{
        setPending : (state , action) => {
            state.pending = action.payload
        },
        setUser : (state , action) => {
            state.user = action.payload
        },
        setProfile : (state , action) => {
            state.profile = action.payload
        }
    }
})

export const { setUser , setProfile , setPending } = AuthSlice.actions;

export default AuthSlice.reducer;