import {configureStore } from "@reduxjs/toolkit"
import user from "./slices/userSlice"

const store = configureStore({
    reducer:{
        userReducer:user

    }
})

export default store;