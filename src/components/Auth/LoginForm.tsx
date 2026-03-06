'use client'
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "@/i18n/navigation";
import PasswordInput from "./PasswordInput";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { config } from "@/utils/config";
import { addUserDetails } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";
import baseApi from "@/redux/api/baseApi";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

type FormType = {
    phone: string,
    password: string,
    role: string
}

const LoginForm = () => {
    const [postSignIn, { isLoading }] = useLoginUserMutation();
    const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);
    const dispatch = useDispatch();
    const router = useRouter();
    const t = useTranslations("login.form");
    const nextRout = useSearchParams().get('next');

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<FormType>({
        defaultValues: { role: "User" }
    });

    const handleFormSubmit: SubmitHandler<FormType> = async (data) => {
        try {
            const res = await postSignIn(data).unwrap();

            setCookie('accessToken', res?.data?.accessToken, {
                httpOnly: false,
                maxAge: 14 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            setCookie('refreshToken', res?.data?.refreshToken, {
                httpOnly: false,
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            dispatch(addUserDetails({
                firstName: res?.data?.user?.first_name,
                profilePicture: res?.data?.user?.picture?.url || "/empty-user.png",
                role: res?.data?.user?.auth?.role
            }));

            dispatch(baseApi.util.resetApiState());
            toast.success(res?.message || 'সাইন ইন সফল');
            reset();
            router.push(nextRout || "/profile");
            router.refresh();

        } catch (err: any) {
            toast.error(err?.data?.message || 'কিছু ভুল হয়েছে, আবার চেষ্টা করুন');
        }
    }

    return (
        <div className='bg-white max-w-xl border border-stroke rounded shadow p-8 mx-auto mb-10'>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-5 md:px-7 lg:px-10 mt-5 md:mt-8 lg:mt-10">

                {/* Phone */}
                <div className="my-5">
                    <label htmlFor={"phone"} className="mb-1.5 font-popin block text-black text-lg">
                        {t("phone")}
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <div className={`w-full flex flex-row items-center border rounded-md ${errors?.phone ? 'border-danger' : 'border-stroke'}`}>
                        <span className="border-r border-gray-300 px-2 font-popin">+88</span>
                        <input
                            type="number"
                            id='phone'
                            {...register("phone", { 
                                required: t("phone_required"), 
                                pattern: { value: /^01\d{9}$/, message: t("phone_invalid") }, 
                                minLength: { value: 11, message: t("phone_invalid") }
                            })}
                            placeholder={t("phone_placeholder")}
                            className="w-full px-2 bg-white py-2.5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-figtree placeholder:font-figtree rounded-r-md"
                        />
                    </div>
                    {errors.phone && <div className='flex items-center mb-2'>
                        <MdErrorOutline className='text-sm text-orange-500' />
                        <p className='text-orange-500 text-sm ml-1'>{errors.phone.message}</p>
                    </div>}
                </div>

                {/* Password */}
                <div className="w-full mx-auto mb-4">
                    <PasswordInput
                        name="password"
                        label={t("password")}
                        placeholder={t("password_placeholder")}
                        register={register}
                        isLarge={true}
                        errors={errors}
                        validationRules={{ required: t("password_required") }}
                    />
                </div>

                <Link href={'/auth/forgot-password'} className='underline underline-offset-2 font-medium font-figtree'>{t("forgot")}</Link>

                {/* Submit */}
                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-figtree rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? t("btns.loading") : t("btns.signin")}</span>
                </button>

                {/* Register Link */}
                <div>
                    <h5 className='text-gray-900 font-popin text-sm md:text-base text-center mt-3'>
                        {t("dont_have_account")} 
                        <Link className='text-primary' href='/auth/signup'> {t("register")}</Link>
                    </h5>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;