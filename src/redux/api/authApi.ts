import { IUser } from "../types";
import baseApi from "./baseApi";

const AuthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<{ message: string, data: { otpToken: { token: string }, paymentLink: string } }, any>({
            query: (body) => ({
                url: '/auth/create',
                method: 'POST',
                body: body
            }),
            // invalidatesTags: []
        }),
        verifyOtp: builder.mutation<{ message: string, data: { "accessToken": string } }, { otp: string }>({
            query: ({ otp }) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: { otp },
            })
        }),

        resendOtp: builder.mutation<{ message: string, data: { token: string } }, { phone: string }>({
            query: (body) => ({
                url: '/auth/resend-otp',
                method: 'POST',
                body
            })
        }),

        loginUser: builder.mutation<{ message: string, data: { accessToken: string, refreshToken: string, user: IUser } }, { phone: string, password: string, role : string }>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['user']
        }),

        forgotPassword: builder.mutation<{ message: string, data: { token: string } }, { phone: string }>({
            query: ({ phone }) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: { phone },
            }),
        }),

        resetPassword: builder.mutation<{ message: string }, { confirmPassword: string, newPassword: string }>({
            query: (body) => ({
                url: '/auth/reset-password',
                method: 'PATCH',
                body: body
            }),
        }),

        getUserProfile: builder.query<{ message: string, data: IUser }, void>({
            query: () => ({
                url: '/users/my-profile',
            }),
            providesTags: ['user']
        }),

        changePassword: builder.mutation<{ message: string }, {
            "oldPassword": string,
            "newPassword": string,
            confirmPassword: string
        }>({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'PATCH',
                body: data
            }),
        }),

        updateProfile: builder.mutation<{ message: string }, { data: any }>({
            query: ({ data }) => ({
                url: '/users/update-my-profile',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['user']
        }),





    })
})

export const { useRegisterUserMutation, useVerifyOtpMutation, useResendOtpMutation, useLoginUserMutation, useResetPasswordMutation, useGetUserProfileQuery, useChangePasswordMutation, useUpdateProfileMutation, useForgotPasswordMutation } = AuthApi;