import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    adminUser :null,
    plans:[],
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
    }
})
export const { loginStart,loginSuccess,loginFailure,logout,otpSuccess,getPlanList} = adminSlice.actions;

export default adminSlice.reducer