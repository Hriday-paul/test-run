"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Banner from "@/components/Auth/Banner";

interface OTPVerifyFormProps {
  onSubmit: (code: string) => void;
  onResendCode?: () => void;
}

export default function OTPVerifyForm({
  onSubmit,
  onResendCode,
}: OTPVerifyFormProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if value entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = inputsRef.current[index - 1];
      prev?.focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length === 6) {
      onSubmit(code);
    }
  };

  return (
    <section>
        <Banner title="Please Verify Your Account"/>
      <div className="flex justify-center my-10 px-4">
        <Card className="w-full max-w-md border rounded">
          <CardContent className="">
            <div className="flex justify-between gap-2 mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-12 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <Button onClick={handleSubmit} className="w-full rounded mb-3">
              Verify
            </Button>

            {/* Resend Code */}
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
