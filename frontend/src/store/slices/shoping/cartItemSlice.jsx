import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api/axiosconfig";

export const addTocartThunk = createAsyncThunk(
  "cartItem/add",
  async ({ productId, userId, quantity }) => {
    try {
      const res1 = await api.post("/api/shoping/cart/add", {
        productId,
        userId,
        quantity,
      });
      const res = res1.data;
      return {
        success: res.success,
        message: res.message,
        response: res,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "something went wrong.Item Not Added",
      };
    }
  }
);

export const getCartItemsThunk = createAsyncThunk(
  "cartItem/getAll",
  async ({ userId }, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue("Invalid userId");
    }

    try {
      const res = await api.get(`/api/shoping/cart/${userId}`);
      
      return res.data.response;  // return only data
    } catch (err) {
      return rejectWithValue(
        err.message || "Could not fetch cart items"
      );
    }
  }
);



export const updateCartItemsThunk = createAsyncThunk(
  "cartItem/update",
  async ({ productId, userId, quantity }) => {
    try {
      const res1 = await api.put("/api/shoping/cart/update-quantity", {
        productId,
        userId,
        quantity,
      });
      const res = res1.data;
      return {
        success: res.success,
        message: res.message || "cart item updated successfully",
        response: res.response,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "something went wrong.Cart item not updated",
      };
    }
  }
);

export const deleteCartItemsThunk = createAsyncThunk(
  "cartItem/delete",
  async ({ productId, userId }) => {
    try {
      const res1 = await api.delete(`/api/shoping/cart/delete-item`, {
        params: { productId, userId },
      });
      const res = res1.data;
      return {
        success: res.success,
        message: res.message || "cart item deleted successfully",
        response: res.response,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "something went wrong.Cart item not deleted",
      };
    }
  }
);

const cartItemSlice = createSlice({
  name: "CartItems",
  initialState: {
    cartItems: [],
    isloading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTocartThunk.pending, (state, action) => {
        state.isloading = true;
        state.cartItems = [];
      })
      .addCase(addTocartThunk.fulfilled, (state, action) => {
        // state.cartItems = action.payload.response;
        console.log("addtocart thunk>>",action.payload.response);
        
        state.isloading = false;
      })
      .addCase(addTocartThunk.rejected,(state,action)=>{
        state.isloading =false;
        state.cartItems=[];
      })
      .addCase(getCartItemsThunk.pending, (state, action) => {
        state.isloading = true;
        state.cartItems = [];
      })
      .addCase(getCartItemsThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload;      
        state.isloading = false;
      })
      .addCase(getCartItemsThunk.rejected,(state,action)=>{
        state.isloading =false;
        state.cartItems=[];
      })
      .addCase(updateCartItemsThunk.pending, (state, action) => {
        state.isloading = true;
        state.cartItems = [];
      })
      .addCase(updateCartItemsThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.response;          
        state.isloading = false;
      })
      .addCase(updateCartItemsThunk.rejected,(state,action)=>{
        state.isloading =false;         
        state.cartItems=[];
      })
      .addCase(deleteCartItemsThunk.pending, (state, action) => {
        state.isloading = true;         
        state.cartItems = [];
      })
      .addCase(deleteCartItemsThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.response;          
        state.isloading = false;
      })
      .addCase(deleteCartItemsThunk.rejected,(state,action)=>{
        state.isloading =false;         
        state.cartItems=[];
      });
      
  },
});

export default cartItemSlice.reducer;
