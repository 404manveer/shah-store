import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/axiosconfig";
import { useSearchParams } from "react-router-dom";


export const fetchshopingProducts = createAsyncThunk(
    "/shopingProducts/fetch",
 async({filter,sortby})=>{
    try {
        const querry =  new  URLSearchParams ({
            ...filter,sortby:sortby
        })
        console.log(querry.toString());
        
        const res =  await api.get(`/api/shoping/product/get?${querry} `)
        return res.data
        
    } catch (error) {
        console.log(error);
        
        
    }
 }   
)
export const fetchShoppingProductDetail = createAsyncThunk(
    "/shopingProductDetail/fetch",
 async(id)=>{
    try {
      
      
        
        const res =  await api.get(`/api/shoping/product/get/${id}`)
        return res?.data
        
    } catch (error) {
        console.log(error);
        
        
    }
 }   
)