import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser :null,
    selectedPlan: null,
    currentUserPreference:null,
    currentUserPlan:null,
    userId:'',
    userIdForContact:'',
    loading:false,
    error:'',
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
     loginStart : (state) => {
        state.loading = true;
     },
     loginSuccess: (state,action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = '';
     },
     loginFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
     },
     logout:(state) => {
        state.currentUser = null;
        state.loading=false;
        state.error = ''
     },
     otpSuccess:(state,action) => {
      state.loading = false;
      state.userId = action.payload
     },
     editUserSuccess:(state,action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = '';
     },
     setPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
     clearPlan: (state) => {
      state.selectedPlan = null;
    },
    setPreference: (state, action) => {
      state.currentUserPreference = action.payload;
    },
     clearPreference: (state) => {
      state.currentUserPreference = '';
    },
    setUserIdForContact:(state,action) => {
      state.userIdForContact = action.payload;
    },
    clearUserIdForContact:(state) => {
      state.userIdForContact = ''
    },
   
    }
})
export const { loginStart,loginSuccess,loginFailure,logout,otpSuccess,editUserSuccess,setPlan,clearPlan,setPreference,clearPreference,setUserIdForContact,clearUserIdForContact} = userSlice.actions;

export const selectPlan = (state) => state.user.selectedPlan;

export const userPreference = (state) => state.user.currentUserPreference;

export const userIdForContact = (state) => state.user.state.userIdForContact;


export default userSlice.reducer