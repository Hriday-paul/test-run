'use client'
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { config } from "@/utils/config";
import { addUserDetails } from "@/redux/slices/userSlice";
import { toast } from "sonner";

type FormType = {
    phone: string,
    password: string,
    role: string
}

const LoginForm = () => {

    const [postSignIn, { isLoading }] = useLoginUserMutation();
    const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);
    const dispatch = useDispatch();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormType>({
        defaultValues: {
            role: "User"
        }
    });

    const handleFormSubmit: SubmitHandler<FormType> = async (data) => {
        try {
            const res = await postSignIn(data).unwrap();

            setCookie('accessToken', res?.data?.accessToken, {
                httpOnly: false,
                maxAge: 14 * 24 * 60 * 60, // 14 days
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            setCookie('refreshToken', res?.data?.refreshToken, {
                httpOnly: false,
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            dispatch(addUserDetails({
                firstName: res?.data?.user?.first_name,
                profilePicture: res?.data?.user?.picture?.url || "/empty-user.png",
                role: res?.data?.user?.auth?.role
            }))

            toast.success(res?.message || 'Signin successfully');
            reset();

            router.push(data?.role == 'User' ? "/user" : '/vendor')
            router.refresh();

        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }

    }

    return (
        <div className='bg-white max-w-xl border border-gray-200 rounded-xl shadow-md p-8 mx-auto mb-10'>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-5 md:px-7 lg:px-10 mt-5 md:mt-8 lg:mt-10">

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
                            className={`w-full px-2 bg-white py-2.5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-figtree placeholder:font-figtree rounded-r-md`}
                        />
                    </div>
                    {errors.phone && <div className='flex items-center mb-2'>
                        <MdErrorOutline className='text-sm text-orange-500' />
                        <p className='text-orange-500 text-sm ml-1'>Invalid Phone</p>
                    </div>}
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
                        }}
                    />

                </div>

                <Link href={'/auth/forgot-password'} className='underline underline-offset-2 font-medium font-figtree'>{"Forgot Password"}</Link>

                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-figtree rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? 'Loading...' : "Sign In"}</span>
                </button>

                <div>
                    <h5 className='text-gray-900 font-popin text-sm md:text-base text-center mt-3'>Don't have any account ?<Link className='text-primary' href='/auth/signup'> Register</Link></h5>
                </div>

            </form>



        </div>
    );
};

export default LoginForm