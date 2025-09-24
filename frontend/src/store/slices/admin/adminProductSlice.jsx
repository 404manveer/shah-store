import {createSlice} from '@reduxjs/toolkit' 
import { adminfetchProduct } from '../../actions/admin/adminProduct'

 const initialState ={
    ProductList:[],
    isProductloading:false,

 }


const adminProductSlice = createSlice({
    name:"ProductList",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{

        builder
        .addCase(adminfetchProduct.pending,(state)=>{
            state.isProductloading=true;
        })
        .addCase(adminfetchProduct.fulfilled,(state,action)=>{
            // console.log(action.payload);
            
            state.isProductloading=false;
            state.ProductList=action.payload.resposnse
        })
        .addCase(adminfetchProduct.rejected,(state)=>{
            state.isProductloading=true;
            state.ProductList=[]
        })
    }
})

export default adminProductSlice.reducer