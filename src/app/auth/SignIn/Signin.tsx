"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type SignInFormValues = {
  phone: string;
  password: string;
  rememberMe: boolean;
};

interface SignInFormProps {
  onSubmit: (data: SignInFormValues) => void;
  onForgetPassword?: () => void;
  setActiveTab: (tab: "signin" | "signup") => void;
}

export default function SignInForm({
  onSubmit,
  onForgetPassword,
  setActiveTab,
}: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="shadow-none rounded border-none">
      <CardContent className="px-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone Number */}
          <Input
            placeholder="Phone Number"
            className="rounded"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          {/* Password with show/hide */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="rounded"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Remember Me & Forget Password */}
          <div className="flex justify-between items-center text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("rememberMe")} />
              Remember Me
            </label>
            <Link href={'/forgetpassword'}
              onClick={onForgetPassword}
              className="text-blue-600 underline cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full rounded">
            Sign In
          </Button>

          {/* Bottom prompt: Go to Sign Up */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <span
              onClick={() => setActiveTab("signup")}
              className="text-blue-600 underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
