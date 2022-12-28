import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
    name : "sidebar",
    initialState : {
        current : "Home"
    },
    reducers : {
        setCurrent : (state , action) => {
            state.current = action.payload
        }
    }
})

export const {setCurrent} = SidebarSlice.actions;

export default SidebarSlice.reducer