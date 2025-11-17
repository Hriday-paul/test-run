
import { IDistrict, IDivision } from "../types";
import baseApi from "./baseApi";

const LocationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allDivisions: builder.query<{ message: string, data: { divisions: IDivision[] } }, void>({
            query: () => ({
                url: '/locations/divisions',
            }),
            // providesTags: ['quote']
        }),
        districtsByDivision: builder.query<{ message: string, data: IDistrict[] }, { divisionId: number }>({
            query: ({ divisionId }) => ({
                url: `/locations/districts/${divisionId}`,
            }),
            // providesTags: ['quote']
        }),

    })
})

export const { useAllDivisionsQuery, useDistrictsByDivisionQuery } = LocationApi