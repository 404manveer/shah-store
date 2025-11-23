import { createSlice } from "@reduxjs/toolkit";
import { fetchshopingProducts,fetchShoppingProductDetail } from "../../actions/shoping/shopingProduct";

const initialState = {
  ProductList: [],
  isProductloading: false,
  productDetail:{}
};

const shopingProductSlice = createSlice({
  name: "ProductList",
  initialState,
  reducers: {
    productListCleaner:(state)=>{
      state.productDetail = {}
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchshopingProducts.pending, (state) => {
        state.isProductloading = true;
      })
      .addCase(fetchshopingProducts.fulfilled, (state, action) => {
       

        state.isProductloading = false;
        state.ProductList = action?.payload?.response;
        console.log( action?.payload);
        
      })
      .addCase(fetchshopingProducts.rejected, (state) => {
        state.isProductloading = true;
        state.ProductList = [];
      })
      .addCase(fetchShoppingProductDetail.pending, (state) => {
        state.isProductloading = true;
      })
      .addCase(fetchShoppingProductDetail.fulfilled, (state, action) => {
       

        state.isProductloading = false;
        state.productDetail = action?.payload?.response;
        
      })
      .addCase(fetchShoppingProductDetail.rejected, (state) => {
        state.isProductloading = true;
        state.productDetail = {};
      });
  },
});

export const {productListCleaner} = shopingProductSlice.actions
export default shopingProductSlice.reducer
