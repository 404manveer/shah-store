import {configureStore } from "@reduxjs/toolkit"
import user from "./slices/userSlice"
import adminProductSlice from "./slices/admin/adminProductSlice"
import shopingProductSlice from "./slices/shoping/shopingProductSlice"
import cartItemSlice  from "./slices/shoping/cartItemSlice"

const store = configureStore({
    reducer:{
        userReducer:user,
        adminProducts:adminProductSlice,
        shopingProducts:shopingProductSlice,
        cartItems: cartItemSlice,

    }
})

export default store;