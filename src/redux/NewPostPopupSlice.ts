import { createSlice } from "@reduxjs/toolkit"

const NewPostPopupSlice = createSlice({
    name : "newpost",
    initialState: {
        active : false,
        value : null,
        property : null
    }
    ,
    reducers: {
        setActive : (state , action) => {
            state.active = action.payload
        },
        setProperty : (state , action) => {
            state.property = action.payload
        },
        setValue : (state , action) => {
            state.value = action.payload
        },
    }
})

export const { setActive , setProperty , setValue } = NewPostPopupSlice.actions;

export default NewPostPopupSlice.reducer;