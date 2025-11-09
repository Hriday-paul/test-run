"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Banner from "@/components/Auth/Banner";

type ForgetPasswordFormValues = {
  phone: string;
};

interface ForgetPasswordFormProps {
  onSubmit: (data: ForgetPasswordFormValues) => void;
}

export default function ForgetPasswordForm({
  onSubmit,
}: ForgetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormValues>();

  return (
    <section>
      <Banner title="Forgot Password" />
      <div className="flex justify-center my-10 px-4  ">
        <Card className="shadow-lg w-full max-w-md border rounded">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                type="tel"
                placeholder="Phone Number"
                className="rounded"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}

              <Button type="submit" className="w-full rounded">
                Send OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
