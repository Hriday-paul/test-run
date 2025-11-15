import { jobType, myjobsType } from "../types";
import baseApi from "./baseApi";

const UserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allQuotes: builder.query<{ message: string, data: { data: myjobsType[], meta: { page: number, limit: number, total: number, totalPage: number } } }, { page: number, jobId ?: string }>({
            query: (query) => ({
                url: '/quote/my-quotes-as-user',
                params: query
            }),
            // providesTags: ['quote']
        }),
        myPostedJobs: builder.query<{ message: string, data: jobType[], meta: { page: number, limit: number, total: number, totalPage: number } }, { startDate?: Date, endDate?: Date, searchTerm?: string }>({
            query: (query) => ({
                url: '/job/my-jobs',
                params: query
            }),
            // providesTags: ['quote']
        }),
    })
})

export const { useAllQuotesQuery, useMyPostedJobsQuery } = UserApi