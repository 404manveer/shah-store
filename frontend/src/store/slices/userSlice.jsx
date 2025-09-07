import { createSlice } from "@reduxjs/toolkit";
import { userRegisteration } from "../actions/userAction";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticate:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loaduser: (state, actions) => {
      state.user = actions.payload;
    },
    
  },
  extraReducers:(builder)=>{
        builder.addCase(userRegisteration.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(userRegisteration.fulfilled,(state,actions)=>{
            state.isLoading= false
            state.user= actions.payload
            state.isAuthenticate=false
        })
         .addCase(userRegisteration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticate=false
      });
    }

});

export const { loaduser } = userSlice.actions;
export default userSlice.reducer;
