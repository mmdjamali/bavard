import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice"
import SidebarSlice from "./SidebarSlice"
import NewPostPopupSlice from "./NewPostPopupSlice"

const store = configureStore({
    reducer:{
        AuthSlice,
        SidebarSlice,
        NewPostPopupSlice
    }
})

export type rootType = ReturnType<typeof store.getState>

export default store