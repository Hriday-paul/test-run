'use client'
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
    phone: string,
    password: string
}

const LoginForm = () => {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const handleRegister: SubmitHandler<Inputs> = async (inputInfo) => {
        try {

        } catch (err: any) {

        }
    }

    return (
        <div>
            <div>
                <div className="border rounded-2xl px-2 py-6 lg:px-10 md:py-10 max-w-xl lg:max-w-2xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl text-black font-popin font-semibold text-center">Login</h2>
                    <div>
                        <h5 className='text-gray-900 text-sm md:text-base text-center mt-3'>Don't have account ? <Link className='text-primary' href='/auth/signup'> Register</Link></h5>
                    </div>

                    <form onSubmit={handleSubmit(handleRegister)} className="px-5 md:px-7 lg:px-10 mt-5 md:mt-8 lg:mt-10">

                        <div className="my-2">
                            <label htmlFor="emailPhone" className="text-base lg:text-lg capitalize text-gray-700 font-popin">Phone * </label>
                            <div className="flex flex-row items-center">
                                <div>

                                </div>
                                <input
                                    className={`w-full px-6 py-3 lg:text-lg font-poppin rounded-lg font-normal border border-gray-200 focus:outline-none mt-2 ${errors.phone ? " border-red-500" : ""}`}
                                    type="text" placeholder={`01****`} id="emailPhone" {...register("phone", { required: true })} />
                            </div>
                            {errors.phone && <div className='flex items-center mb-2'>
                                <MdErrorOutline className='text-sm text-orange-500' />
                                <p className='text-orange-500 text-sm ml-1'>Invalid Phone</p>
                            </div>}
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="text-base lg:text-lg capitalize text-gray-700 font-poppin">Password * </label>
                            <input
                                className={`w-full px-6 py-3 lg:text-lg font-poppin rounded-lg font-normal border border-gray-200 focus:outline-none mt-2 ${errors.password ? " border-red-500" : ""}`}
                                type="password" placeholder={"****"} id="password" {...register("password", { required: true })} />
                        </div>

                        <button
                            // disabled={isLoading}
                            className="bg-primary w-full text-center hover:bg-opacity-80 duration-200 py-3 rounded-lg mt-8 mb-5 disabled:bg-primary disabled:cursor-not-allowed flex justify-center items-center gap-x-3">
                            {/* {isLoading && <ImSpinner2 className="text-2xl text-white animate-spin" />} */}
                            <span className="text-lg text-white text-center font-poppin font-medium">{'Loading...'}</span>
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default LoginForm