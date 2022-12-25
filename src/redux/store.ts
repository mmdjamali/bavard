import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice"

const store = configureStore({
    reducer:{
        AuthSlice,
    }
})

export type rootType = ReturnType<typeof store.getState>

export default store