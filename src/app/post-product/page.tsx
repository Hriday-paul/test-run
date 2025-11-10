"use client";

import { useState, DragEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FaCar,
  FaDollarSign,
  FaFileAlt,
  FaCogs,
  FaPalette,
  FaGasPump,
  FaRoad,
  FaCarSide,
  FaBuilding,
  FaLayerGroup,
  FaCog,
  FaCalendarAlt,
  FaWind,
  FaChair,
  FaMapMarkerAlt,
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
  FaUpload,
  FaTimes,
} from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PostBanner from "@/components/Post/PostBanner";

type ProductFormValues = {
  title: string;
  price: string;
  description: string;
  engine: string;
  mileage: string;
  color: string;
  fuelType: string;
  driveType: string;
  carType: string;
  brand: string;
  model: string;
  gearBox: string;
  year: string;
  bodyType: string;
  airCon: string;
  seat: string;
  condition: string;
  location: string;
  house: string;
  road: string;
  phone: string;
  email: string;
};

export default function PostProduct() {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      engine: "N/A",
      mileage: "N/A",
      color: "N/A",
      fuelType: "N/A",
      driveType: "N/A",
      carType: "N/A",
      brand: "N/A",
      model: "N/A",
      gearBox: "N/A",
      year: "N/A",
      bodyType: "N/A",
      airCon: "N/A",
      seat: "N/A",
      condition: "N/A",
      location: "N/A",
      house: "N/A",
      road: "N/A",
      phone: "N/A",
      email: "N/A",
    },
  });

  // Handle image upload (multiple)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  // Handle drag & drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  // Remove selected image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle submit
  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    console.log("Form Data:", data);
    console.log("Uploaded Images:", images);
    reset();
    setImages([]);
  };

  return (
    <section>
      <PostBanner
        title="Post Your Product"
        path="/post-product.png"
        description="Search and find your best items for buy or rent"
      />
      <div className="py-16 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Card className="border rounded-2xl shadow-md">
            <CardContent className="p-8 space-y-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* ========== SECTION 1: Basic Info ========== */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                        <FaFileAlt /> Title
                      </label>
                      <Input
                        {...register("title", {
                          required: "Title is required",
                        })}
                        placeholder="Enter title"
                        className="rounded h-12"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                        <FaDollarSign /> Price
                      </label>
                      <Input
                        {...register("price", {
                          required: "Price is required",
                        })}
                        placeholder="Enter price"
                        className="rounded h-12"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                      <FaFileAlt /> Description
                    </label>
                    <Textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      rows={6}
                      placeholder="Enter product description"
                      className="rounded"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="mt-6">
                    <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                      <FaUpload /> Upload Images
                    </label>

                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition relative"
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id="imageUpload"
                      />
                      <p className="text-gray-600">
                        Drag image here, or{" "}
                        <label
                          htmlFor="imageUpload"
                          className="text-primary font-semibold cursor-pointer"
                        >
                          Browse
                        </label>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Note: Only JPG, JPEG and PNG. Suggested size 600×450px
                        (4:3 aspect ratio).
                      </p>
                    </div>

                    {/* ✅ Image Preview with Delete Option */}
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

                {/* ========== SECTION 2: Car Features ========== */}
                <div>
                  <h2 className="text-2xl font-bold text-[#1D3557] mb-6 flex items-center gap-2">
                    <FaCogs /> Car Features
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "engine", icon: <FaCogs />, label: "Engine" },
                      { name: "mileage", icon: <FaCogs />, label: "Mileage" },
                      { name: "color", icon: <FaPalette />, label: "Color" },
                      {
                        name: "fuelType",
                        icon: <FaGasPump />,
                        label: "Fuel Type",
                      },
                      {
                        name: "driveType",
                        icon: <FaRoad />,
                        label: "Drive Type",
                      },
                      {
                        name: "carType",
                        icon: <FaCarSide />,
                        label: "Car Type",
                      },
                      { name: "brand", icon: <FaBuilding />, label: "Brand" },
                      { name: "model", icon: <FaLayerGroup />, label: "Model" },
                      { name: "gearBox", icon: <FaCog />, label: "Gear Box" },
                      { name: "year", icon: <FaCalendarAlt />, label: "Year" },
                      { name: "bodyType", icon: <FaCar />, label: "Body Type" },
                      { name: "airCon", icon: <FaWind />, label: "Air Con" },
                      {
                        name: "seat",
                        icon: <FaChair />,
                        label: "Car Seat",
                      },
                      {
                        name: "condition",
                        icon: <FaMagnifyingGlass />,
                        label: "Condition",
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                          {field.icon} {field.label}
                        </label>
                        <Input
                          {...register(field.name as keyof ProductFormValues, {
                            required: `${field.label} is required`,
                          })}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className="rounded h-12"
                        />
                        {errors[field.name as keyof ProductFormValues] && (
                          <p className="text-red-500 text-sm">
                            {(errors[field.name as keyof ProductFormValues]
                              ?.message as string) || ""}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ========== SECTION 3: Contact Info ========== */}
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
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                          {field.icon} {field.label}
                        </label>
                        <Input
                          {...register(field.name as keyof ProductFormValues, {
                            required: `${field.label} is required`,
                          })}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className="rounded h-12"
                        />
                        {errors[field.name as keyof ProductFormValues] && (
                          <p className="text-red-500 text-sm">
                            {(errors[field.name as keyof ProductFormValues]
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
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded cursor-pointer h-12"
                  >
                    Submit Product
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
