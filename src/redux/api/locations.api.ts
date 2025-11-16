
import { IDivision } from "../types";
import baseApi from "./baseApi";

const LocationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allDivisions: builder.query<{ message: string, data: {divisions : IDivision[]} }, void>({
            query: () => ({
                url: '/locations/divisions',
            }),
            // providesTags: ['quote']
        }),

    })
})

export const { useAllDivisionsQuery } = LocationApi