import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./baseURL";


export const problemsAPI = createApi({
  reducerPath: "problemsApi",

  tagTypes: ["Problems"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/api/problems`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getAllProblems: builder.query({
      query: () => "/",
      providesTags: ["Problems"]
    }),

    getAllProblemsByDifficulty: builder.query({
      query: (difficulty) => `/?difficulty=${difficulty}`,
      providesTags: ["Problems"]
    }),

    getProblemById: builder.query({
      query: (id) => `/${id}`
    })


  })

});

export const {
  useGetAllProblemsQuery,
  useGetAllProblemsByDifficultyQuery,
  useGetProblemByIdQuery
} = problemsAPI;