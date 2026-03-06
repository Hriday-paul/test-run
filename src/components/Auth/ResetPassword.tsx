"use client"

import { useRouter } from '@/i18n/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { toast } from 'sonner';
import PasswordInput from './PasswordInput';
import { useTranslations } from 'next-intl';

type resetPasswordType = {
    new_password: string,
    confirm_password: string,
}

const ResetPassword = () => {
    const [postResetPassword, { isLoading }] = useResetPasswordMutation();
    const t = useTranslations("reset_pass.form");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<resetPasswordType>();

    const router = useRouter();

    const handleFormSubmit: SubmitHandler<resetPasswordType> = async (data) => {

        if (data?.new_password !== data?.confirm_password) {
            toast.error(t("toast.mismatch"));
            return;
        }

        try {
            const res = await postResetPassword({
                newPassword: data?.new_password,
                confirmPassword: data?.confirm_password
            }).unwrap();

            toast.success(res?.message || t("toast.success"));
            reset();
            router.push('/auth/login');

        } catch (err: any) {
            toast.error(err?.data?.message || t("toast.error"));
        }
    }

    return (
        <div>
            <div className='bg-white max-w-xl border border-stroke rounded shadow p-8 mx-auto mb-10'>

                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    {/* New Password */}
                    <div className="w-full mx-auto mb-4">
                        <PasswordInput
                            name="new_password"
                            label={t("fields.new_password.label")}
                            placeholder={t("fields.new_password.placeholder")}
                            register={register}
                            isLarge={true}
                            errors={errors}
                            validationRules={{
                                required: t("fields.new_password.required"),
                            }}
                        />

                        {errors?.new_password && (
                            <p className="text-orange-500 text-sm font-figtree">
                                {errors?.new_password?.message as string}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="w-full mx-auto mb-4">
                        <PasswordInput
                            name="confirm_password"
                            label={t("fields.confirm_password.label")}
                            placeholder={t("fields.confirm_password.placeholder")}
                            register={register}
                            isLarge={true}
                            errors={errors}
                            validationRules={{
                                required: t("fields.confirm_password.required"),
                            }}
                        />

                        {(watch('new_password') !== watch('confirm_password')) && (
                            <p className='text-xs font-figtree text-danger mt-0.5'>
                                {t("fields.confirm_password.mismatch")}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='bg-primary py-3 font-figtree rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white cursor-pointer'
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
        </div>
    );
};

export default ResetPassword;