import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
    reducerPath: "authApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/auth",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (formData) => ({
                url: "/register",
                method: "POST",
                body: formData,
            }),
        }),
        login: builder.mutation({
            query: (formData) => ({
                url: "/login",
                method: "POST",
                body: formData,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (formData) => ({
                url: "/forgot-password",
                method: "POST",
                body: formData
            }),
        }),
        resetPassword: builder.mutation({
            query: (formData) => ({
                url: `/reset-password/${formData.token}`,
                method: "POST",
                body: {password: formData.password}
            })
        })
    }),
});
export const { useRegisterMutation, useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authAPI;
