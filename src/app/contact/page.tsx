"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, MapPin } from "lucide-react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section>
      {/* Hero Section */}
      <div className="relative h-[350px] md:h-[420px] w-full">
        <Image
          src="/car-banner.jpg"
          alt="Contact Us Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>

          <div className="mt-4">
            <Breadcrumb>
              <BreadcrumbList className="justify-center">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-gray-200 hover:text-white"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-300" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="text-primary hover:text-primary font-medium"
                  >
                    Contact Us
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex justify-center">
        <div className="container mx-auto w-full my-16">
          <Card className="shadow-lg border rounded overflow-hidden">
            <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Form */}
              <div>
                <h2 className="text-3xl font-bold text-[#1D3557] mb-8">
                  Get in touch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10 rounded h-12"
                        required
                      />
                    </div>
                    {/* Last Name */}
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10 rounded h-12"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 rounded h-12"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 rounded h-12"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <Textarea
                      name="message"
                      placeholder="Leave us a message..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={8}
                      className="rounded h-40 resize-none"
                      required
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                      required
                    />
                    <label className="text-sm text-gray-700">
                      Agree to our{" "}
                      <span className="text-primary font-medium">
                        Terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary font-medium">
                        Privacy Policy
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded cursor-pointer"
                  >
                    Send message
                  </Button>
                </form>
              </div>

              {/* Right: Map */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1D3557]">
                  Our Location
                </h3>
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>123 O'Connell St, Dublin, D01, Ireland</span>
                </div>

                {/* Embedded Map */}
                <div className="mt-4 rounded overflow-hidden h-80 w-full shadow-md">
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.290160418042!2d-6.262029823653136!3d53.349805979978504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9a0f16f9df%3A0x82c1c69b2d91b86c!2sO'Connell%20Street%2C%20Dublin!5e0!3m2!1sen!2sie!4v1697056119450!5m2!1sen!2sie"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-xl"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
