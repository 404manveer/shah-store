import {configureStore } from "@reduxjs/toolkit"
import user from "./slices/userSlice"
import adminProductSlice from "./slices/admin/adminProductSlice"

const store = configureStore({
    reducer:{
        userReducer:user,
        adminProducts:adminProductSlice,

    }
})

export default store;