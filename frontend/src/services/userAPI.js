import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./baseURL";

export const userAPI = createApi({
  reducerPath: "userApi",
  tagTypes: ["UserStats", "Submission"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/api/user`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserDashboard: builder.query({
      query: () => "/dashboard",
      providesTags: ["UserStats"],
    }),
    getSubmissionById: builder.query({
      query: (id) => `/submissions/${id}`,
      providesTags: (result, error, id) => [{ type: "Submission", id }],
    }),
  }),
});

export const { useGetUserDashboardQuery, useGetSubmissionByIdQuery } = userAPI;
