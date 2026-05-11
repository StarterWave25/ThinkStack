import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./baseURL";


export const evaluateAPI = createApi({
  reducerPath: "evaluateApi",

  tagTypes: [""],

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/api/evaluate`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    evaluateProblem: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "POST",
      })
    })
  })
});

export const {
  useEvaluateProblemMutation
} = evaluateAPI;