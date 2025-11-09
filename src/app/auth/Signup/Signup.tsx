"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // For navigation

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email?: string;
  location: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

interface SignUpFormProps {
  onSubmit: (data: SignUpFormValues) => void,
  setActiveTab: (tab: "signup" | "signin") => void
}

export default function SignUpForm({ onSubmit, setActiveTab }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormValues>();

  return (
    <Card className="border-none shadow-none">
      <CardContent className="px-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                className="rounded"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Input
                className="rounded"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <Input
            className="rounded"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <Input
            className="rounded"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <Input
            className="rounded"
            placeholder="Email (Optional)"
            {...register("email")}
          />

          <Input
            className="rounded"
            placeholder="Location"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}

          <Input
            className="rounded"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <Input
            className="rounded"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1"
              {...register("terms", {
                required: "You must agree to the terms",
              })}
            />
            <label className="text-sm text-gray-700">
              By hitting the "Register" button, you agree to the{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Terms & Conditions
              </span>{" "}
              &{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          <p className="text-center text-sm text-gray-600 mt-2">
            Still don't have an account?{" "}
            <span onClick={()=> setActiveTab('signin')} className="text-blue-600 underline cursor-pointer">
              Sign Up
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
