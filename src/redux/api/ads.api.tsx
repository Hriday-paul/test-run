import { Add, IMeta } from "../types";
import baseApi from "./baseApi";

const AddApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addDetails: builder.query<{ message: string, data: Add }, { id: string }>({
            query: ({ id }) => ({
                url: `/ads/details/${id}`
            }),
        }),

        allAds: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: `/ads/by-user`,
                params: query
            }),
            providesTags: ['ads']
        }),

        allFeatureAds: builder.query<{ message: string, data: {ad : Add, id : number}[] }, void>({
            query: () => ({
                url: `/feature-ads`,
            }),
            providesTags: ['feature_ads']
        }),

        featureAdd: builder.mutation<{ message: string, data: { data: Add[], meta: IMeta } }, { addId: number }>({
            query: ({ addId }) => ({
                url: `/ads/feature/${addId}`,
                method: "POST"
            }),
            invalidatesTags: ["feature_ads"]
        }),
        bumpAdd: builder.mutation<{ message: string, data: { data: Add[], meta: IMeta } }, { addId: number }>({
            query: ({ addId }) => ({
                url: `/ads/bump/${addId}`,
                method: "POST"
            }),
            invalidatesTags: ['ads']
        }),
        dltAdd: builder.mutation<{ message: string, data: { data: Add[], meta: IMeta } }, { addId: number }>({
            query: ({ addId }) => ({
                url: `/ads/${addId}`,
                method: "DELETE"
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
        addcar: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/ads/cars',
                method: "POST",
                body
            }),
            invalidatesTags: ['ads', "cars"]
        }),
        updateCar: builder.mutation<{ message: string }, {id : number, body : any}>({
            query: ({body, id}) => ({
                url: `/ads/cars/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ['ads', "cars"]
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
        addBike: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/ads/bikes',
                method: "POST",
                body
            }),
            invalidatesTags: ['ads', "bikes"]
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
        addWorkshop: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/ads/work-shops',
                method: "POST",
                body
            }),
            invalidatesTags: ['ads', "workshops"]
        }),
        allAccessories: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/accessories',
                params: query
            }),
            providesTags: ['ads', "accessories"]
        }),

        addAccessories: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/ads/accessories',
                method: "POST",
                body
            }),
            invalidatesTags: ['ads', "accessories"]
        }),

        allJobs: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/jobs',
                params: query
            }),
            providesTags: ['ads', "jobs"]
        }),
        addJob: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/ads/jobs',
                method: "POST",
                body
            }),
            invalidatesTags: ['ads', "jobs"]
        }),

        allLawyers: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/lawyers',
                params: query
            }),
            providesTags: ['ads', "lawyers"]
        }),
        addLawyer: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/ads/lawyers',
                method: "POST",
                body
            }),
            invalidatesTags: ['ads', "lawyers"]
        }),

        allExchanges: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/exchanges',
                params: query
            }),
            providesTags: ['ads', "exchanges"]
        }),
        addExchange: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/ads/exchanges',
                method: "POST",
                body
            }),
            invalidatesTags: ['ads', "exchanges"]
        }),
        allRentcar: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/rent-cars',
                params: query
            }),
            providesTags: ['ads', "rentCars"]
        }),
        addRentCar: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/ads/rent-cars',
                method: "POST",
                body
            }),
            invalidatesTags: ['ads', "rentCars"]
        }),

        dltAdImage: builder.mutation<{ message: string }, {addId : number, id : number}>({
            query: ({id, addId}) => ({
                url: `/ads/image/${id}`,
                method: "DELETE",
                body : {addId}
            }),
            invalidatesTags: ['ads']
        }),

    })
})

export const { useAllcarsQuery, useMaxcarsCountQuery, useAllBikesQuery, useMaxBikesCountQuery, useAllWorkshopsQuery, useAllAccessoriesQuery, useAllJobsQuery, useAllLawyersQuery, useAllExchangesQuery, useAllRentcarQuery, useAddDetailsQuery, useAllAdsQuery, useFeatureAddMutation, useBumpAddMutation, useDltAddMutation, useDltAdImageMutation,
    
    useAddcarMutation, useUpdateCarMutation, 
    useAddBikeMutation, useAddWorkshopMutation, useAddAccessoriesMutation, useAddRentCarMutation, useAddJobMutation, useAddExchangeMutation, useAddLawyerMutation, useAllFeatureAdsQuery } = AddApi;