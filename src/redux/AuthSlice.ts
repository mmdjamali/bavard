import { Slice, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name : "auth",
    initialState : {
        pending : true,
        user : null,
        profile : null,
        error : null
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
        },
        setError : (state , action) => {
            state.error = action.payload
        }
    }
})

export const { setUser , setProfile , setPending , setError } = AuthSlice.actions;

export default AuthSlice.reducer;