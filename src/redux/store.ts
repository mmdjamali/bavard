import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice"
import SidebarSlice from "./SidebarSlice"
import NewPostPopupSlice from "./NewPostPopupSlice"
import DefaultProfileSlice from "./DefaultProfileSlice"

const store = configureStore({
    reducer:{
        AuthSlice,
        SidebarSlice,
        NewPostPopupSlice,
        DefaultProfileSlice
    }
})

export type rootType = ReturnType<typeof store.getState>

export default store