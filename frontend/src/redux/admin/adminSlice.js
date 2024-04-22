import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    adminUser :null,
    plans:[],
    subscriptions:[],
    loading:false,
    error:'',
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
     loginStart : (state) => {
        state.loading = true;
     },
     loginSuccess: (state,action) => {
        state.adminUser = action.payload;
        state.loading = false;
        state.error = '';
     },
     loginFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
     },
     logout:(state) => {
        state.adminUser = null;
        state.loading=false;
        state.error = ''
     },
     otpSuccess:(state) => {
      state.loading = false;
     },
     getPlanList: (state, action) => {
      state.plans = action.payload;
    },
    getSubscriptionList: (state, action) => {
      state.subscriptions = action.payload;
    },
    }
})
export const { loginStart,loginSuccess,loginFailure,logout,otpSuccess,getPlanList,getSubscriptionList} = adminSlice.actions;

export default adminSlice.reducer