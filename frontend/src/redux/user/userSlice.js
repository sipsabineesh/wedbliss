import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser :null,
    loading:false,
    error:'',
}
console.log('USERSLICE ');

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
    }
})
export const { loginStart,loginSuccess,loginFailure,logout } = userSlice.actions;

export default userSlice.reducer