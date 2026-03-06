'use client'
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "@/i18n/navigation";
import { useResendOtpMutation } from "@/redux/api/authApi";
import { useCookies } from "react-cookie";
import { config } from "@/utils/config";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import SignUpForm from "./SignUpForm";

type FormType = {
    phone: string,
}

const ResendOtp = () => {

    const [postResend, { isLoading }] = useResendOtpMutation();
    const [_, setCookie] = useCookies(['token']);
    const router = useRouter();
    const t = useTranslations("resend_otp.form");

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
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            toast.success(t("toast.success"));SignUpForm
            reset();

            router.push("/auth/verify-otp");
            router.refresh();

        } catch (err: any) {
            toast.error(err?.data?.message || t("toast.error"));
        }
    }

    return (
        <div className='bg-white max-w-xl border border-stroke rounded shadow p-8 mx-auto mb-10'>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-5 md:px-7 lg:px-10 mt-5 md:mt-8 lg:mt-10">

                {/* Phone Field */}
                <div className="my-5">
                    <label htmlFor="phone" className="mb-1.5 font-popin block text-black text-lg">
                        {t("phone.label")}
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>

                    <div className={`w-full flex flex-row items-center border rounded-md ${errors?.phone ? 'border-danger' : 'border-stroke'}`}>
                        <span className="border-r border-gray-300 px-2 font-popin">+88</span>

                        <input
                            type="number"
                            id='phone'
                            {...register("phone", {
                                required: true,
                                pattern: {
                                    value: /^01\d{9}$/,
                                    message: t("phone.invalid")
                                },
                                minLength: {
                                    value: 11,
                                    message: t("phone.invalid")
                                }
                            })}
                            placeholder={t("phone.placeholder")}
                            className="w-full px-2 bg-white py-2.5 text-black outline-none transition font-figtree rounded-r-md"
                        />
                    </div>

                    {errors.phone && (
                        <div className='flex items-center mb-2'>
                            {errors?.phone?.message && <MdErrorOutline className='text-sm text-orange-500' />}
                            <p className='text-orange-500 text-sm ml-1'>
                                {errors.phone.message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    disabled={isLoading}
                    className='bg-primary py-3 font-figtree rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'
                >
                    {isLoading && (
                        <ImSpinner2 className="text-lg text-white animate-spin" />
                    )}
                    <span>
                        {isLoading ? t("btn.loading") : t("btn.txt")}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default ResendOtp;