"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Clock,
  House,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaBangladeshiTakaSign, FaRoad } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import ShopBanner from "@/components/Shop/ShopBanner";

const sliderImages: string[] = [
  "/eng-oil.png",
  "/car-image.png",
  "/car-image.png",
  "/car-image.png",
  "/bike.png",
  "/car-image.png",
];

export default function CarDetails() {
  const [current, setCurrent] = useState<number>(0);

  // Auto slide
  useEffect(() => {
    const auto = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(auto);
  }, []);

  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );

  const next = () => setCurrent((prev) => (prev + 1) % sliderImages.length);

  return (
    <section className="w-full">
      <ShopBanner
        title="Accessories Details"
        desc="Search and find your best items for buy or rent"
        path="/accessories.png"
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-6">
            {/* MAIN SLIDER */}
            <div className="relative w-full h-[360px] rounded-lg overflow-hidden">
              <Image
                src={sliderImages[current]}
                alt="Vehicle"
                fill
                className="object-cover transition-all duration-300"
              />

              {/* Controls */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {sliderImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-32 h-20 rounded-md overflow-hidden cursor-pointer border ${
                    current === index ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt="Thumb"
                    width={160}
                    height={100}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* TITLE + DESCRIPTION */}
            <div>
              <h1 className="text-2xl font-semibold">
                Toyota Motors And Car Servicing Center
              </h1>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                The Mercedes-Benz C220d is a luxury diesel variant of the
                Mercedes-Benz C-Class, known for its combination of fuel
                efficiency, comfort, and advanced technology. It features a 2.0L
                turbo-diesel engine with high power output (e.g., 194 PS), rear
                -wheel drive, and a focus on premium features like the MBUX
                infotainment system, digital key, and safety assists.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* SELLER INFO CARD */}
            <Card className="p-0">
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">Shop Information</h3>
                <Separator className="my-3" />
                <div className="space-y-3 mt-4 text-sm text-gray-600">
                  <Info
                    icon={<MapPin size={16} />}
                    label="Location"
                    value="Mohakhali, Dhaka"
                  />
                  <Info icon={<House size={16} />} label="House" value="#164" />
                  <Info icon={<FaRoad size={16} />} label="Road" value="#03" />
                  <Info
                    icon={<Clock size={16} />}
                    label="Open Time"
                    value="9:00 AM"
                  />
                  <Info
                    icon={<Clock size={16} />}
                    label="Close Time"
                    value="9:00 PM"
                  />
                  <Info
                    icon={<Phone size={16} />}
                    label="Phone"
                    value="+880 1755-555555"
                  />
                  <Info
                    icon={<MdEmail size={16} />}
                    label="Email"
                    value="example@gmail.com"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">Product Details</h3>
                <Separator className="my-3" />
                <div className="space-y-3 mt-4 text-sm text-gray-600">
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src="/eng-oil.png"
                      className="h-16 w-24 rounded-2xl"
                      alt="oil"
                    />
                    <h4 className="font-semibold text-xl">Toyota Motors And Car Servicing Center</h4>
                  </div>
                  <div className="flex justify-between items-center text-2xl">
                    <span className="flex items-center gap-3"><FaBangladeshiTakaSign/> Price</span>
                    <span>$600</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Small Reusable Components --- */

interface FeatureProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function Feature({ icon, label, value }: FeatureProps) {
  return (
    <div className="flex items-center gap-3 justify-between text-[18px]">
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <span className=" text-gray-500">{value}</span>
    </div>
  );
}

interface InfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function Info({ icon, label, value }: InfoProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-600">
        {icon} <span>{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}
