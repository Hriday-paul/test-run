"use client"
import { useResendOtpMutation, useVerifyOtpMutation } from '@/redux/api/authApi';
import { config } from '@/utils/config';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ImSpinner2 } from 'react-icons/im';
import OTPInput from "react-otp-input";
import { toast } from 'sonner';

const VerifyOtpForm = () => {
    const [postVerify, { isLoading }] = useVerifyOtpMutation();
    const [otp, setOtp] = useState<string>('');
    const nextRout = useSearchParams().get('next') || '/auth/login'

    const navig = useRouter();

    const submitOtp = async () => {
        try {
            const res = await postVerify({ otp: otp }).unwrap();

            toast.success(res?.message || 'Verify successfully');

            navig.push(nextRout)

        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    }

    return (
        <div className='bg-white max-w-xl rounded-xl shadow-md p-8 mx-auto'>
            <div className="mx-auto flex w-full max-w-md flex-col">
                <div className="mx-auto my-10">
                    <OTPInput
                        inputStyle='otpinputStyle'
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType="text"
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>

                <div className="flex flex-row justify-center gap-x-5 items-center mt-3">
                    <Link href={"/auth/resend-otp"} className='bg-primary text-white font-figtree font-medium px-6 py-3 rounded text-base hover:bg-opacity-85 duration-200 disabled:bg-opacity-80 disabled:cursor-not-allowed'>
                        Resend
                    </Link>

                    <button onClick={submitOtp} disabled={isLoading || otp.length < 6} className='bg-primary text-white font-figtree font-medium px-6 py-3 rounded text-base hover:bg-opacity-85 duration-200 cursor-pointer disabled:bg-opacity-80 disabled:cursor-not-allowed flex flex-row gap-x-1 items-center'>
                        {isLoading && <ImSpinner2 className="text-xl text-white animate-spin mr-1.5" />}
                        <p>Verify</p>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default VerifyOtpForm;