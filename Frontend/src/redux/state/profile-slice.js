import {createSlice} from "@reduxjs/toolkit";
export const profileSlice=createSlice({
    name:'profile',
    initialState:{
        value:[],
        Followers: [],
        Following: []
    },
    reducers:{
        SetProfile:(state,action)=>{
            state.value=action.payload
        }
    }
})
export  const {SetProfile}=profileSlice.actions;
export default  profileSlice.reducer;
