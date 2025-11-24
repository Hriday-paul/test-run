import { IService } from "../types";
import baseApi from "./baseApi";

const OrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addNewOrder: builder.mutation<{ message: string, data : string }, any>({
            query: (body) => ({
                url: '/orders',
                method: "POST",
                body
            }),
            // providesTags: ['user']
        }),
    })

})

export const { useAddNewOrderMutation } = OrderApi;