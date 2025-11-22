import { IMeta, Payment } from "../types";
import baseApi from "./baseApi";

const UserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        myPayments: builder.query<{ message: string, data: { data: Payment[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/payments/my-payment',
                params: query
            }),
            providesTags: ['payments']
        }),
        addstats: builder.query<{
            message: string,
            data: {
                add_count: number,
                postedAd: number,

                feature_count: number,
                featured: number,

                bump_count: number,
                bumped: number
            }
        }, void>({
            query: () => ({
                url: '/users/add-stats',
            }),
            providesTags: ['payments']
        }),
    })
})

export const { useMyPaymentsQuery, useAddstatsQuery } = UserApi;