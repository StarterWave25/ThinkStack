import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./baseURL";


export const draftAPI = createApi({
  reducerPath: "draftsApi",

  tagTypes: ["Problem"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/api/drafts`,
    credentials: "include",
  }),

  endpoints: (builder) => ({

    saveProblem: builder.mutation({
      query: (payload) => ({
        url: "/save",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Problem"]
    }),

    getProblem: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Problem"]
    })

  })

});

export const {
  useGetProblemQuery,
  useSaveProblemMutation
} = draftAPI;