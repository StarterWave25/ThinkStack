import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
    reducerPath: "authApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/auth",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: "/register",
                method: "POST",
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user,
            }),
        }),
    }),
});
export const { useRegisterMutation, useLoginMutation } = authAPI;
