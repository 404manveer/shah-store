// actions/userAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axiosconfig";

export const userRegisteration = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/register", user);
      console.log("userRegi>>>>", res.data);
      return res.data; // goes to `fulfilled` case
    } catch (error) {
      console.log("error from userAction while registration", error);
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const userloging = createAsyncThunk(
  "user/login",
  async (user,{rejectWithValue}) =>{
    try {
      const res = await api.post("/api/auth/login", user);
      console.log("userlogin>>>>",res.data);
      return res.data;
      
      
    } catch (error) {
      console.log("error from useraction while login",error);
      return rejectWithValue(error.response?.data)
      
      
    }
  }
)
export const userLogout = createAsyncThunk(
  "user/logout",
  async()=>{
    try {
      const res = await api.get("/api/auth/logout")
      console.log("action logout",res);
      
      return res
      
    } catch (error) {
      console.log(error);
      
      
    }
  }
)

export const checkauth = createAsyncThunk(
  "user/checkauth",
  async()=>{
    try {
      const res = await api.get("/api/auth/check-auth",{
        withCredentials:true,
        // headers:{
        //   "cache-control":"no-store,on-cache,proxy-revalidate,must-revalidate"
        // }
      });
      return res.data

      
      
    } catch (error) {
      console.log("error from checkuath action from useraction",error);
      
      
    }
  }
)
