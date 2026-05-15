import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from './baseURL'

export const authAPI = createApi({
    reducerPath: "authApi",

    tagTypes: ["User"],

    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}/api/auth`,
        credentials: "include",
    }),

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (formData) => ({
                url: "/register",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["User"],
        }),
        login: builder.mutation({
            query: (formData) => ({
                url: "/login",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["User"],
        }),
        forgotPassword: builder.mutation({
            query: (formData) => ({
                url: "/forgot-password",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["User"]
        }),
        resetPassword: builder.mutation({
            query: (formData) => ({
                url: `/reset-password/${formData.token}`,
                method: "POST",
                body: { password: formData.password }
            }),
            invalidatesTags: ["User"]
        }),
        changePassword: builder.mutation({
            query: (formData) => ({
                url: "/change-password",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["User"]
        }),
        getMe: builder.query({
            query: () => "/me",
            providesTags: ["User"]
        }),
        updateProfile: builder.mutation({
            query: (formData) => ({
                url: "/update-profile",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            }),
            invalidatesTags: ["User"]
        }),
    }),

});

export const {
    useRegisterMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useGetMeQuery,
    useUpdateProfileMutation,
    useLogoutMutation
} = authAPI;