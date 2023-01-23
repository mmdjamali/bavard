import { createSlice } from "@reduxjs/toolkit";

export const PopupSlice = createSlice({
    name : "Popup",
    initialState : {
        profileEditor : false
    },
    reducers:{
        activateProfileEditor : (state , action) => {
            state.profileEditor = action.payload;
        }
    }
})

export const { activateProfileEditor } = PopupSlice.actions;

export default PopupSlice.reducer;