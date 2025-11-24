import { IService } from "../types";
import baseApi from "./baseApi";

const ServiceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        allServices: builder.query<{ message: string, data: IService[] }, void>({
            query: () => ({
                url: '/document-services',
            }),
            // providesTags: ['user']
        }),

        serviceDetails: builder.query<{ message: string, data: IService }, {id : string}>({
            query: ({id}) => ({
                url: `/document-services/${id}`,
            }),
            // providesTags: ['user']
        }),

    })

})

export const { useAllServicesQuery, useServiceDetailsQuery } = ServiceApi;