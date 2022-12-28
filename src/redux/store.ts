import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice"
import SidebarSlice from "./SidebarSlice"

const store = configureStore({
    reducer:{
        AuthSlice,
        SidebarSlice
    }
})

export type rootType = ReturnType<typeof store.getState>

export default store