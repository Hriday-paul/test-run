import { Add, IMeta } from "../types";
import baseApi from "./baseApi";

const AddApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addDetails: builder.query<{ message: string, data: Add }, {id : string}>({
            query: ({id}) => ({
                url: `/ads/details/${id}`
            }),
        }),

        allAds: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: `/ads/by-user`,
                params : query
            }),
             providesTags: ['ads']
        }),

        featureAdd: builder.mutation<{ message: string, data: { data: Add[], meta: IMeta } }, {addId : number}>({
            query: ({addId}) => ({
                url: `/ads/feature/${addId}`,
                method : "POST"
            }),
             invalidatesTags: ['ads']
        }),
        bumpAdd: builder.mutation<{ message: string, data: { data: Add[], meta: IMeta } }, {addId : number}>({
            query: ({addId}) => ({
                url: `/ads/bump/${addId}`,
                method : "POST"
            }),
             invalidatesTags: ['ads']
        }),
        dltAdd: builder.mutation<{ message: string, data: { data: Add[], meta: IMeta } }, {addId : number}>({
            query: ({addId}) => ({
                url: `/ads/${addId}`,
                method : "DELETE"
            }),
             invalidatesTags: ['ads']
        }),

        allcars: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/cars',
                params: query
            }),
            providesTags: ['ads', "cars"]
        }),

        maxcarsCount: builder.query<{ message: string, data: { maxPrice: { _max: { price: number } }, maxMileage: { _max: { mileage: number } } } }, void>({
            query: () => ({
                url: '/ads/cars/max-counts',
            }),
            providesTags: ['ads', "cars"]
        }),

        allBikes: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/bikes',
                params: query
            }),
            providesTags: ['ads', "bikes"]
        }),

        maxBikesCount: builder.query<{ message: string, data: { maxPrice: { _max: { price: number } }, maxMileage: { _max: { mileage: number } } } }, void>({
            query: () => ({
                url: '/ads/bikes/max-counts',
            }),
            providesTags: ['ads', "bikes"]
        }),

        allWorkshops: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/work-shops',
                params: query
            }),
            providesTags: ['ads', "workshops"]
        }),
        allAccessories: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/accessories',
                params: query
            }),
            providesTags: ['ads', "accessories"]
        }),
        
        allJobs: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/jobs',
                params: query
            }),
            providesTags: ['ads', "jobs"]
        }),

        allLawyers: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/lawyers',
                params: query
            }),
            providesTags: ['ads', "lawyers"]
        }),
        allExchanges: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/exchanges',
                params: query
            }),
            providesTags: ['ads', "exchanges"]
        }),
        allRentcar: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/rent-cars',
                params: query
            }),
            providesTags: ['ads', "rentCars"]
        }),

    })
})

export const { useAllcarsQuery, useMaxcarsCountQuery, useAllBikesQuery, useMaxBikesCountQuery, useAllWorkshopsQuery, useAllAccessoriesQuery, useAllJobsQuery, useAllLawyersQuery, useAllExchangesQuery, useAllRentcarQuery, useAddDetailsQuery, useAllAdsQuery, useFeatureAddMutation, useBumpAddMutation, useDltAddMutation } = AddApi;