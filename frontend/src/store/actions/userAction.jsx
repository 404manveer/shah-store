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
