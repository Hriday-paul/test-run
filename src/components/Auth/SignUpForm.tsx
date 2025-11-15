"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { motion } from "motion/react"
import { useRegisterUserMutation } from '@/redux/api/authApi';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';
import { config } from '@/utils/config';
import { MdErrorOutline } from 'react-icons/md';
import PasswordInput from './PasswordInput';

type signUpType = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
    phone: string,
    terms: boolean,
}

const SignUpForm = () => {
    const [postUser, { isLoading }] = useRegisterUserMutation();
    const [_, setCookie] = useCookies(['token', 'accessToken', 'refreshToken']);

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<signUpType>({
        defaultValues: {
            role: "User"
        }
    });

    const router = useRouter();

    const handleFormSubmit: SubmitHandler<signUpType> = async (data) => {
        try {

            if (data?.password !== data?.confirmPassword) return;

            const newData = {
                first_name: data?.first_name,
                last_name: data?.last_name,
                email: data?.email,
                password: data?.password,
                role: data?.role,
                phone: data?.phone
            }

            const res = await postUser(newData).unwrap();

            setCookie('token', res?.data?.otpToken, {
                httpOnly: false,
                // maxAge: (24 * (60 * 60)) * 30, // 30 days
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            const next = data?.role == "Vendor" ? "/pricing" : "/auth/login"

            reset()

            toast.success(res?.message || 'Signup successfully');

            router.push(`/auth/verify-otp?next=${next}`)

        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    }

    return (
        <div>
            <div className='bg-white border border-stroke max-w-xl rounded-xl shadow-md p-8 mx-auto mb-10'>

                <form onSubmit={handleSubmit(handleFormSubmit)} className=''>

                    {/* -------------------check box---------------------- */}
                    <div className="flex gap-10 justify-center my-6">
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center cursor-pointer" htmlFor="user">
                                <input {...register("role", { required: true })} value='User' type="radio" className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all" id="user" />
                                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                </span>
                            </label>
                            <label className="ml-2 text-black cursor-pointer text-base font-poppin" htmlFor="user">User</label>
                        </div>

                        <div className="inline-flex items-center">
                            <label className="relative flex items-center cursor-pointer" htmlFor="dealer">
                                <input {...register("role", { required: true })} value='Vendor' type="radio" className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all" id="dealer" />
                                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                </span>
                            </label>
                            <label className="ml-2 text-black cursor-pointer text-base font-poppin" htmlFor="dealer">Vendor</label>
                        </div>
                    </div>

                    <div className='flex flex-row gap-x-3 mb-4'>
                        {/* -----------------first name-------------- */}
                        <div className="w-full mx-auto">
                            <label htmlFor='firstname' className="mb-1.5 block text-black   font-popin">
                                First Name
                                <span className="text-red-500 text-base ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id='firstname'
                                {...register("first_name", { required: true })}
                                placeholder="Enter your first Name"
                                className={`w-full rounded-md border bg-white  py-2.5 px-4 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-popin placeholder:font-popin ${errors?.first_name ? 'border-danger' : 'border-stroke '}`}
                            />
                            {errors?.first_name && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.first_name?.message}</p>}
                        </div>

                        {/* -----------------last name-------------- */}
                        <div className="w-full mx-auto">
                            <label htmlFor='lastname' className="mb-1.5 block text-black   font-popin">
                                Last Name
                                {/* <span className="text-red-500 text-base ml-1">*</span> */}
                            </label>
                            <input
                                type="text"
                                id='lastname'
                                {...register("last_name")}
                                placeholder="Enter your last Name"
                                className={`w-full rounded-md border bg-white  py-2.5 px-4 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-popin placeholder:font-popin ${errors?.last_name ? 'border-danger' : 'border-stroke '}`}
                            />
                            {errors?.last_name && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.last_name?.message}</p>}
                        </div>
                    </div>

                    <div className="my-5">
                        <label htmlFor={"phone"} className={`mb-1.5 font-popin block text-black text-lg`}>
                            Phone
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <div className={`w-full flex flex-row items-center border rounded-md ${errors?.phone ? 'border-danger' : 'border-stroke '}`}>
                            <span className="border-r border-gray-300 px-2 font-popin">+88</span>
                            <input
                                type="number"
                                id='phone'
                                {...register("phone", { pattern: /^01\d{9}$/, minLength: 11, required: true })}
                                placeholder="01****"
                                className={`w-full px-2 bg-white py-2.5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-popin placeholder:font-popin rounded-r-md`}
                            />
                        </div>
                        {errors.phone && <div className='flex items-center mb-2'>
                            <MdErrorOutline className='text-sm text-orange-500' />
                            <p className='text-orange-500 text-sm ml-1'>Invalid Phone</p>
                        </div>}
                    </div>

                    {/* -----------------email-------------- */}
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='email' className="mb-1.5 block text-black font-popin">
                            Email Address
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            id='email'
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'email invalid'
                                }
                            })}
                            placeholder="xyz@gmail.com"
                            className={`w-full rounded-md border bg-white  py-2.5 px-4 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-popin placeholder:font-popin ${errors?.email ? 'border-danger' : ' border-stroke '}`}
                        />
                        {errors?.email && <p className="text-orange-500 text-sm col-span-2 font-popin">{errors?.email?.message}</p>}
                    </div>

                    {/* -----------------Password Input-------------- */}
                    <div className="w-full mx-auto mb-4">
                        <PasswordInput
                            name="password"
                            label={"Password"}
                            placeholder="Enter your password"
                            register={register}
                            isLarge={true}
                            errors={errors}
                            validationRules={{
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message:
                                        "Password must include 1 uppercase, 1 number, 1 special character, and 8+ characters.",
                                },
                            }}
                        />
                    </div>

                    {/* -----------------Confirm Password Input-------------- */}
                    <div className="w-full mx-auto mb-4">

                        <PasswordInput
                            name="confirmPassword"
                            label={"Confirm Password"}
                            placeholder="Enter your confirm password"
                            register={register}
                            isLarge={true}
                            errors={errors}
                            validationRules={{
                                required: "Confirm Password is required",
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message:
                                        "Password must include 1 uppercase, 1 number, 1 special character, and 8+ characters.",
                                },
                            }}
                        />

                        {(watch('password') !== watch('confirmPassword')) && <p className='text-xs font-popin text-danger mt-0.5'>Password not match</p>}

                    </div>

                    {/* -----------------terms-------------- */}
                    <div className="w-full mx-auto mb-4">
                        <div className="inline-flex items-center mt-2">
                            <label className="flex items-center cursor-pointer relative" htmlFor={"terms"}>
                                <input type="checkbox" {...register("terms", { required: true })} name='terms' className={`peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-sm border ${errors?.terms ? 'border-danger' : 'dark:text-white border-stroke '}`} id={"terms"} defaultChecked={true} />

                                <span className="absolute text-primary opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </label>
                            <label className="ml-1.5 text-zinc-500 font-popin text-sm capitalize" htmlFor={"terms"}>
                                By hitting the "Register" button, you agree to the <Link href="/terms" className='text-primary'>Terms conditions</Link> & <Link href="/privacy" className='text-primary'>Privacy Policy</Link>
                            </label>
                        </div>
                    </div>

                    <button type='submit' disabled={isLoading} className='bg-primary py-3 font-popin text-secondary rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                        {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                        <span>{isLoading ? 'Loading...' : watch("role") == "Vendor" ? "Sign Up" : "Sign Up for Free"}</span>
                    </button>

                    <div>
                        <h5 className='text-gray-900 font-popin text-sm md:text-base text-center mt-3'>Already have a account ?<Link className='text-primary' href='/auth/login'> Login Now</Link></h5>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default SignUpForm;