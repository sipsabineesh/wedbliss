import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    adminUser :null,
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
        console.log('Login Success Payload:', state.adminUser);
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
    }
})
export const { loginStart,loginSuccess,loginFailure,logout,otpSuccess} = adminSlice.actions;

export default adminSlice.reducer