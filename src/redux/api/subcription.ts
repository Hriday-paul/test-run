import { IOrder, IPackage, IService } from "../types";
import baseApi from "./baseApi";

const SubscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        PurchasePack: builder.mutation<{ message: string, data : string }, {packageId : number}>({
            query: (body) => ({
                url: '/subscriptions',
                method: "POST",
                body : {package : body?.packageId}
            }),
            invalidatesTags: ['orders']
        }),


        allPackages: builder.query<{ message: string, data : IPackage[] }, void>({
            query: () => ({
                url: '/packages',
            }),
            providesTags: ['orders']
        }),


    })

})

export const { useAllPackagesQuery, usePurchasePackMutation } = SubscriptionApi;