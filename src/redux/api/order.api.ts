import { IOrder, IService } from "../types";
import baseApi from "./baseApi";

const OrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addNewOrder: builder.mutation<{ message: string, data : string }, any>({
            query: (body) => ({
                url: '/orders',
                method: "POST",
                body
            }),
            invalidatesTags: ['orders']
        }),


        allOrders: builder.query<{ message: string, data : IOrder[] }, void>({
            query: () => ({
                url: '/orders/my-orders',
            }),
            providesTags: ['orders']
        }),


    })

})

export const { useAddNewOrderMutation, useAllOrdersQuery } = OrderApi;