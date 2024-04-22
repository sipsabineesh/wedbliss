import {apiSlice} from '../apiSlice';
const ADMIN_URL ='/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
 endpoints:(builder) => ({
    
    // adminLogin:builder.mutation({
    //     query : (data) => ({
    //         url:'http://localhost:8000/api/users/adminLogin',
    //         method:'POST',
    //         body:data
    //     }),
    // }), 
    createPlan:builder.mutation({
        query : (data) => ({

            url:'/api/admin/createPlan',
            method:'POST',
            body:data
        }),
        
    }), 

    editPlan:builder.mutation({
        query : (data) => ({
            url:'/api/admin/editPlan/',
            method:'PUT',
            body:data
        }),
    }),
    deletePlan:builder.mutation({
        query : (data) => ({
            url:'/api/admin/deletePlan/',
            method:'PUT',
            body:data
        }),
    }), 
    approveSubscription:builder.mutation({
        query : (data) => ({
            url:'/api/admin/approveSubscription/',
            method:'PUT',
            body:data
        }),
    }), 
    
        // logout:builder.mutation({
        //     query : () => ({
        //         url:'http://localhost:8000/api/users/logout',
        //         method:'POST'
        //     })
        // }),
    }),
})
export const { 
    // useAdminLoginMutation,
    useCreatePlanMutation,
    useEditPlanMutation,
    useDeletePlanMutation,
    useApproveSubscriptionMutation,
 } = adminApiSlice;