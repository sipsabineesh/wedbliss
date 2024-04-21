import {apiSlice} from '../apiSlice';
const USER_URL ='/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
 endpoints:(builder) => ({
    getPlans:builder.query({
        query : () =>`${USER_URL}/getPlans/`,
    }),
    }),
})
export const { 
    useGetPlansQuery
 } = userApiSlice;