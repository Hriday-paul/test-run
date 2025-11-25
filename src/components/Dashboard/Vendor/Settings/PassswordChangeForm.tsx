"use client"
import PasswordInput from '@/components/Auth/PasswordInput';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import Swal from 'sweetalert2';

type changePasswordType = {
    "oldPassword": string,
    "newPassword": string,
    confirmPassword: string
}

function PassswordChangeForm() {

    const [postChangePassword, { isLoading }] = useChangePasswordMutation();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<changePasswordType>();

    const handleFormSubmit: SubmitHandler<changePasswordType> = async (data) => {
        if (data?.newPassword !== data?.confirmPassword) return;
        try {
            const res = await postChangePassword(data).unwrap();
            Swal.fire({
                title: "Password Changed Successfully!",
                text: "Your account password is now updated",
                customClass: {
                    title: "text-2xl text-black font-figtree",
                    container: "text-sm font-medium font-figtree text-zinc-900",
                    cancelButton: "!bg-primary text-white",
                    confirmButton: "!bg-primary text-white"
                },
                icon: 'success',
                showCancelButton: true,
                showConfirmButton: false,
                confirmButtonText: "Close",
                confirmButtonColor: "#38CB6E",
                cancelButtonText: "Close",
            });
            reset();
        } catch (err: any) {
            Swal.fire({
                title: err?.data?.message || "Something went wrong, try again",
                text: "Try again or delay some times, then again try",
                customClass: {
                    title: "text-2xl text-black font-figtree",
                    container: "text-sm font-medium font-figtree text-zinc-900",
                    cancelButton: "!bg-primary text-white",
                    confirmButton: "!bg-primary text-white"
                },
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
                confirmButtonText: "Close",
                confirmButtonColor: "#38CB6E",
                cancelButtonText: "Close",
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className='bg-white p-5 border border-stroke rounded-xl'>

            <div className='border-b border-stroke pb-3'>
                <h6 className='text-xl font-popin font-medium'>Change Password</h6>
            </div>

            <div className="w-full mx-auto my-5">
                <PasswordInput
                    name="oldPassword"
                    label={"Current Password"}
                    placeholder="Enter your current password"
                    register={register}
                    isLarge={true}
                    errors={errors}
                    validationRules={{
                        required: "Current Password is required",
                    }}
                />
            </div>

            <div className="w-full mx-auto my-5">
                <PasswordInput
                    name="newPassword"
                    label={"New Password"}
                    placeholder="Enter your new password"
                    register={register}
                    isLarge={true}
                    errors={errors}
                    validationRules={{
                        required: "New Password is required",
                    }}
                />
            </div>

            <div className="w-full mx-auto my-5">
                <PasswordInput
                    name="confirmPassword"
                    label={"Confirm Password"}
                    placeholder="Enter confirm password"
                    register={register}
                    isLarge={true}
                    errors={errors}
                    validationRules={{
                        required: "Confirm Password is required",
                    }}
                />
            </div>

            {(watch('newPassword') !== watch('confirmPassword')) && <p className='text-xs font-figtree text-danger mt-0.5'>Password not match</p>}

            <button type='submit' disabled={isLoading} className='bg-primary py-3 font-popin rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                <span>{isLoading ? 'Loading...' : "Update"}</span>
            </button>
        </form>
    )

}

export default PassswordChangeForm