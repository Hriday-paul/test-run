'use client'
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useCookies } from "react-cookie";
import { config } from "@/utils/config";
import { toast } from "sonner";

type FormType = {
    phone: string,
}

const ForgotPassForm = () => {

    const [postResend, { isLoading }] = useForgotPasswordMutation();
    const [_, setCookie] = useCookies(['token']);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormType>();

    const handleFormSubmit: SubmitHandler<FormType> = async (data) => {
        try {
            const res = await postResend(data).unwrap();

            setCookie('token', res?.data?.token, {
                httpOnly: false,
                // maxAge: (24 * (60 * 60)) * 30, // 30 days
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            toast.success('An otp send to your phone by sms');
            reset();

            router.push("/auth/verify-otp?next=/auth/reset-password")
            router.refresh();

        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }

    }

    return (
        <div className='bg-white max-w-xl border border-gray-200 rounded-xl shadow-md p-8 mx-auto mb-10'>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-5 md:px-7 lg:px-10 mt-5 md:mt-8 lg:mt-10">

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

                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-figtree rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? 'Loading...' : "Submit"}</span>
                </button>
            </form>



        </div>
    );
};

export default ForgotPassForm