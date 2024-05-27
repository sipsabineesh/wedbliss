import {apiSlice} from '../apiSlice';
const USER_URL ='/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
 endpoints:(builder) => ({
    getUser:builder.query({
        query : (id) =>`${USER_URL}/getUser/${id}`,
    }),
    getPlans:builder.query({
        query : () =>`${USER_URL}/getPlans/`,
    }),
    getSuggestions:builder.query({
        query : (id) =>`${USER_URL}/getSuggestions/${id}`,
    }),
    forgotPassword:builder.mutation({
        query : (data) => ({
            url:`${USER_URL}/sendChangePasswordLink/`,
            method:'POST',
            body:data
        }),
    }),
    changePassword:builder.mutation({
        query : (data) => ({
            url:`${USER_URL}/changePassword/`,
            method:'POST',
            body:data
        }),
    }),

    verifyEmailAddress:builder.mutation({
        query : (data) => ({
            url:`${USER_URL}/sendChangeEmailOTP/`,
            method:'POST',
            body:data
        }),
    }),

    changeEmailAddress:builder.mutation({
        query : (data) => ({
            url:`${USER_URL}/changeEmailAddress/`,
            method:'POST',
            body:data
        }),
    }),
    googleAuth:builder.mutation({
        query : (data) => ({
            url:`api/auth/google/`,
            method:'POST',
            body:data
        }),
    }),
    addSubscription:builder.mutation({
        query : (data) => ({
           
            url:`${USER_URL}/addSubscription/`,
            method:'POST',
            body:data
        }),
    }),
    updateSubscription:builder.mutation({
        query : (data) => ({
            url:`${USER_URL}/updateSubscription/`,
            method:'POST',
            body:data
        }),
    }),
    addPreference:builder.mutation({
        query : (data) => ({
            url:`${USER_URL}/addPreference/`,
            method:'POST',
            body:data
        }),
    }),
    }),
})
export const {
    useGetUserQuery,
    useGetPlansQuery,
    useGetSuggestionsQuery,
    useForgotPasswordMutation,
    useChangePasswordMutation, 
    useVerifyEmailAddressMutation,
    useChangeEmailAddressMutation,
    useGoogleAuthMutation,
    useAddSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useAddPreferenceMutation,
 } = userApiSlice;