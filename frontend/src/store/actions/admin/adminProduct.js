import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/axiosconfig";




export const adminCreateProduct = createAsyncThunk(
    "adminproduct/create",
    async (formdata)=>{
        try {
           
            
            const res = await api.post("/api/admin/product/create",formdata,{headers:{"Content-Type":"application/json",},})
            return res.data
            
        
        } catch (error) {
            console.log(error);
            
            
        }
    }
)
export const adminfetchProduct = createAsyncThunk(
    "adminproduct/fetch",
    async ()=>{
        try {
            const res = await api.get("/api/admin/product/fetch")
            // console.log("adminfetchproduct",res);
            return res.data
            
        
        } catch (error) {
            console.log(error);
            
            
        }
    }
)
export const adminUpdateProduct = createAsyncThunk(
    "adminproduct/create",
    async ({formData,id})=>{
        console.log("updateaction>>>>>>>>>>>>",formData);
        
        try {
            const res = await api.put(`/api/admin/product/update/${id}`,formData,{headers:{"Content-Type":"application/json",}},)
            console.log("adminUpadteproduct",res.data);
            return res.data
            
        
        } catch (error) {
            console.log(error);
            
            
        }
    }
)
export const adminDeleteProduct = createAsyncThunk( 
    "adminproduct/delete",
    async ({id})=>{
        console.log("delet>>>",id);
        
        try {
            const res = await api.delete(`/api/admin/product/delete/${id}`)
            console.log("adminDeleteproduct",res.data);
            return res.data
            
        
        } catch (error) {
            console.log(error);
            
            
        }
    }
)