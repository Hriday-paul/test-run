import { Add, IMeta } from "../types";
import baseApi from "./baseApi";

const AddApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allcars: builder.query<{ message: string, data: { data: Add[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/ads/cars',
                params: query
            }),
            providesTags: ['ads', "cars"]
        }),

        maxcarsCount: builder.query<{ message: string, data: { maxPrice: {_max : {price : number}}, maxMileage: {_max : {mileage : number}} } }, void>({
            query: () => ({
                url: '/ads/cars/max-counts',
            }),
            providesTags: ['ads', "cars"]
        }),

    })
})

export const { useAllcarsQuery, useMaxcarsCountQuery } = AddApi