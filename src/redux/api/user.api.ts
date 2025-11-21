import baseApi from "./baseApi";

const UserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        myPayments: builder.query<{ message: string, data: [], meta: { page: number, limit: number, total: number, totalPage: number } }, {}>({
            query: (query) => ({
                url: '/payments/my-payment',
                params: query
            }),
            providesTags: ['payments']
        }),
    })
})

export const {  useMyPaymentsQuery } = UserApi