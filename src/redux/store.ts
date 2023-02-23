import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice"
import SidebarSlice from "./SidebarSlice"
import DefaultProfileSlice from "./DefaultProfileSlice"
import PopupSlice from "./PopupSlice"

const store = configureStore({
    reducer:{
        AuthSlice,
        SidebarSlice,
        DefaultProfileSlice,
        PopupSlice
    }
})

export type rootType = ReturnType<typeof store.getState>

export default store