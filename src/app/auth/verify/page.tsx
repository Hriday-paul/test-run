"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Banner from "@/components/Auth/Banner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

interface OTPVerifyFormProps {
  onSubmit: (code: string) => void;
  onResendCode?: () => void;
}

export default function OTPVerifyForm({
  onSubmit,
  onResendCode,
}: OTPVerifyFormProps) {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (otp.length === 6) {
      onSubmit(otp);
    }
  };

  return (
    <section>
      <Banner title="Please Verify Your Account" />
      <div className="flex justify-center my-10 px-4">
        <Card className="w-full max-w-md border rounded">
          <CardContent className="flex flex-col items-center gap-6 py-8">
            {/* 🔢 OTP Input with pattern */}
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {/* ✅ Verify Button */}
            <Button onClick={handleSubmit} className="w-full rounded">
              Verify
            </Button>

            {/* 🔁 Resend Code */}
            <p className="text-center text-sm text-gray-600">
              Didn’t receive the code?{" "}
              <span
                onClick={onResendCode}
                className="text-blue-600 underline cursor-pointer"
              >
                Resend
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
