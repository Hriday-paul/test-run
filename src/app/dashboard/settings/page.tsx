"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaUpload, FaTimes } from "react-icons/fa";

type AccountDetailsValues = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  phone: string;
  website: string;
  house: string;
  location: string;
  road: string;
};

type PasswordChangeValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type SocialProfileValues = {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
};

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const { register: registerAccount, handleSubmit: handleAccountSubmit } =
    useForm<AccountDetailsValues>();

  const { register: registerPassword, handleSubmit: handlePasswordSubmit } =
    useForm<PasswordChangeValues>();

  const { register: registerSocial, handleSubmit: handleSocialSubmit } =
    useForm<SocialProfileValues>();

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };

  const removeProfileImage = () => setProfileImage(null);

  const onSubmitAccount: SubmitHandler<AccountDetailsValues> = (data) =>
    console.log(data);
  const onSubmitPassword: SubmitHandler<PasswordChangeValues> = (data) =>
    console.log(data);
  const onSubmitSocial: SubmitHandler<SocialProfileValues> = (data) =>
    console.log(data);

  return (
    <section className="py-10 px-4 md:px-10 space-y-10 max-w-5xl mx-auto">
      {/* ================= User Profile ================= */}
      <Card className="border rounded-2xl shadow-md">
        <CardContent className="p-8 flex flex-col items-center gap-4">
          {/* Profile Photo */}
          <div className="relative">
            {profileImage ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="w-28 h-28 object-cover rounded-full border"
                />
                <button
                  type="button"
                  onClick={removeProfileImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ) : (
              <label className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-full cursor-pointer border hover:bg-gray-200 transition">
                <span className="text-gray-500">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Name & Address */}
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700">John Doe</p>
            <p className="text-gray-500 mt-1">123 Main Street, Dhaka</p>
          </div>
        </CardContent>
      </Card>

      {/* ================= Account Details ================= */}
      <Card className="border rounded-2xl shadow-md">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-[#1D3557]">
            Account Details
          </h2>
          <form
            onSubmit={handleAccountSubmit(onSubmitAccount)}
            className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                First Name
              </label>
              <Input
                {...registerAccount("firstName", { required: true })}
                placeholder="First Name"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Last Name
              </label>
              <Input
                {...registerAccount("lastName", { required: true })}
                placeholder="Last Name"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <Input
                {...registerAccount("email", { required: true })}
                placeholder="Email"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Whatsapp
              </label>
              <Input
                {...registerAccount("whatsapp")}
                placeholder="Whatsapp"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Phone
              </label>
              <Input
                {...registerAccount("phone")}
                placeholder="Phone"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Website
              </label>
              <Input
                {...registerAccount("website")}
                placeholder="Website"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                House
              </label>
              <Input
                {...registerAccount("house")}
                placeholder="House"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Location
              </label>
              <Input
                {...registerAccount("location")}
                placeholder="Location"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Road
              </label>
              <Input
                {...registerAccount("road")}
                placeholder="Road"
                className="rounded h-12"
              />
            </div>

            <Button
              type="submit"
              className="col-span-full w-full bg-primary text-white rounded h-12 mt-4"
            >
              Save Account Details
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ================= Password Change ================= */}
      <Card className="border rounded-2xl shadow-md">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-[#1D3557]">
            Change Password
          </h2>
          <form
            onSubmit={handlePasswordSubmit(onSubmitPassword)}
            className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Old Password
              </label>
              <Input
                {...registerPassword("oldPassword", { required: true })}
                placeholder="Old Password"
                type="password"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                New Password
              </label>
              <Input
                {...registerPassword("newPassword", { required: true })}
                placeholder="New Password"
                type="password"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Confirm New Password
              </label>
              <Input
                {...registerPassword("confirmNewPassword", { required: true })}
                placeholder="Confirm New Password"
                type="password"
                className="rounded h-12"
              />
            </div>

            <Button
              type="submit"
              className="col-span-full w-full bg-primary text-white rounded h-12 mt-4"
            >
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ================= Social Profile ================= */}
      <Card className="border rounded-2xl shadow-md">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-[#1D3557]">
            Social Profile
          </h2>
          <form
            onSubmit={handleSocialSubmit(onSubmitSocial)}
            className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Facebook
              </label>
              <Input
                {...registerSocial("facebook")}
                placeholder="Facebook URL"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Instagram
              </label>
              <Input
                {...registerSocial("instagram")}
                placeholder="Instagram URL"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Twitter
              </label>
              <Input
                {...registerSocial("twitter")}
                placeholder="Twitter URL"
                className="rounded h-12"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                LinkedIn
              </label>
              <Input
                {...registerSocial("linkedin")}
                placeholder="LinkedIn URL"
                className="rounded h-12"
              />
            </div>

            <Button
              type="submit"
              className="col-span-full w-full bg-primary text-white rounded h-12 mt-4"
            >
              Save Social Links
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
