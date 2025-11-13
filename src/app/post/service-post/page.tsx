"use client";

import { useState, DragEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FaFileAlt,
  FaUpload,
  FaMapMarkerAlt,
  FaHome,
  FaRoad,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import PostBanner from "@/components/Post/PostBanner";

export type ServiceFormValues = {
  title: string;
  description: string;
  location: string;
  house: string;
  road: string;
  phone: string;
  email: string;
  openTime: string;
  closeTime: string;
};

export default function UploadService() {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormValues>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      house: "",
      road: "",
      phone: "",
      email: "",
      openTime: "",
      closeTime: "",
    },
  });

  // Image Upload Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<ServiceFormValues> = (data) => {
    console.log("Service Data:", data);
    console.log("Uploaded Images:", images);
    reset();
    setImages([]);
  };

  return (
    <section>
      <PostBanner
        title="Service Post"
        description="Search and find your best items for buy or rent"
        path="/service.png"
      />
      <div className="py-16 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <Card className="border rounded-2xl shadow-md">
            <CardContent className="p-8 space-y-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* ======= Section 1: Service Info ======= */}
                <div>
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="flex items-center gap-2 text-gray-700 mb-2 font-medium"
                    >
                      <FaFileAlt /> Title
                    </label>
                    <Input
                      autoFocus
                      id="title"
                      {...register("title", { required: "Title is required" })}
                      placeholder="Enter service title"
                      className="rounded h-12 bg-white"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <label
                      htmlFor="description"
                      className="flex items-center gap-2 text-gray-700 mb-2 font-medium"
                    >
                      <FaFileAlt /> Description
                    </label>
                    <Textarea
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                      placeholder="Enter description"
                      rows={4}
                      className="rounded bg-white"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="mt-6">
                    <label
                      htmlFor="images"
                      className="flex items-center gap-2 text-gray-700 mb-2 font-medium"
                    >
                      <FaUpload /> Upload Images
                    </label>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition relative"
                    >
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <p className="text-gray-600">
                        Drag images here, or{" "}
                        <span className="text-primary font-semibold cursor-pointer">
                          Browse
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Note: Only JPG, JPEG, PNG. Suggested size 600×450px.
                      </p>
                    </div>

                    {images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((file, index) => (
                          <div
                            key={index}
                            className="relative group rounded-lg overflow-hidden"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`preview-${index}`}
                              className="w-full h-32 object-cover rounded-md border shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ======= Section 2: Information ======= */}
                <div>
                  <h2 className="text-2xl font-bold text-[#1D3557] mb-6 flex items-center gap-2">
                    Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        name: "location",
                        icon: <FaMapMarkerAlt />,
                        label: "Location",
                      },
                      { name: "house", icon: <FaHome />, label: "House" },
                      { name: "road", icon: <FaRoad />, label: "Road" },
                      { name: "phone", icon: <FaPhoneAlt />, label: "Phone" },
                      { name: "email", icon: <FaEnvelope />, label: "Email" },
                      {
                        name: "openTime",
                        icon: <FaClock />,
                        label: "Open Time",
                      },
                      {
                        name: "closeTime",
                        icon: <FaClock />,
                        label: "Close Time",
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="flex items-center gap-2 text-gray-700 mb-2 font-medium"
                        >
                          {field.icon} {field.label}
                        </label>
                        <Input
                          id={field.name}
                          {...register(field.name as keyof ServiceFormValues, {
                            required: `${field.label} is required`,
                          })}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className="rounded h-12 bg-white"
                        />
                        {errors[field.name as keyof ServiceFormValues] && (
                          <p className="text-red-500 text-sm">
                            {(errors[field.name as keyof ServiceFormValues]
                              ?.message as string) || ""}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded h-12"
                  >
                    Post Service
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
