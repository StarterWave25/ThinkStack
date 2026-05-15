import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./baseURL";

export const userAPI = createApi({
    reducerPath: "userApi",
    tagTypes: ["user"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}/api/user`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (formData) => ({
                url: "/update-profile",
                method: "PUT",
                body: formData,
            }),
        }),
        uploadPhoto: builder.mutation({
            query: (formData) => ({
                url: "/profile-picture",
                method: "PUT",
                body: formData,
            }),
        }),
    }),
});
export const { useUpdateProfileMutation, useUploadPhotoMutation } = userAPI;
