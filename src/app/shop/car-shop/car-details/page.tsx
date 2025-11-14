"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Car,
  Users,
  AirVent,
  Repeat,
  Settings,
  Droplet,
  Cpu,
  Share2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GiSteeringWheel } from "react-icons/gi";
import { FaEye, FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import ShopBanner from "@/components/Shop/ShopBanner";

const sliderImages: string[] = [
  "/car-image.png",
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
    <section>
      <ShopBanner
        title="Car Details"
        desc="Search and find your best items for buy or rent"
        path="/profile-banner.jpg"
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
              <h1 className="text-2xl font-semibold">Mercedes-Benz C220d</h1>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                The Mercedes-Benz C220d is a luxury diesel variant known for its
                fuel efficiency, comfort, and advanced technology. It features a
                2.0L turbo-diesel engine with high power output and a premium
                interior, digital key, safety assists, and the latest MBUX
                infotainment system.
              </p>
            </div>
            <Separator />
            <div>
              <h2 className="text-lg font-semibold mb-4">Car Features:</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
                <Feature icon={<Cpu size={24} />} label="Engine" value="N/A" />
                <Feature
                  icon={<MapPin size={24} />}
                  label="Mileage"
                  value="20,330 km"
                />
                <Feature
                  icon={<Droplet size={24} />}
                  label="Fuel Type"
                  value="Petrol"
                />
                <Feature
                  icon={<GiSteeringWheel size={24} />}
                  label="Drive Type"
                  value="Right"
                />
                <Feature
                  icon={<Car size={24} />}
                  label="Car Type"
                  value="Sedan"
                />
                <Feature
                  icon={<Settings size={24} />}
                  label="Gearbox"
                  value="Automatic"
                />
                <Feature
                  icon={<Calendar size={24} />}
                  label="Year"
                  value="2025"
                />
                <Feature
                  icon={<Car size={24} />}
                  label="Brand"
                  value="Mercedes"
                />
                <Feature
                  icon={<Repeat size={24} />}
                  label="Condition"
                  value="Used"
                />
                <Feature
                  icon={<AirVent size={24} />}
                  label="Air Con"
                  value="Yes"
                />
                <Feature
                  icon={<Users size={24} />}
                  label="Car Seat"
                  value="4 Seats"
                />
                <Feature
                  icon={<Car size={24} />}
                  label="Body Type"
                  value="4WD & SUVs"
                />
                <Feature icon={<Car size={24} />} label="Model" value="3D" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* SELLER INFO CARD */}
            <Card className="p-0">
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-4">
                  Seller Information
                </h3>
                <Separator className="my-3" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-medium">Shahid Hasan</p>
                    <p className="text-xs text-green-600">● Online Now</p>
                  </div>
                </div>

                <div className="space-y-3 mt-4 text-sm text-gray-600">
                  <Info
                    icon={<MapPin size={16} />}
                    label="Location"
                    value="Mohakhali, Dhaka"
                  />
                  <Info
                    icon={<Phone size={16} />}
                    label="Phone"
                    value="+880 1235-6526"
                  />
                  <Info
                    icon={<Mail size={16} />}
                    label="Email"
                    value="abc@gmail.com"
                  />
                </div>

                <Button className="flex gap-2 items-center w-full mt-4 bg-green-500 hover:bg-green-600">
                  <FaWhatsapp /> WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* POST OVERVIEW */}
            <Card className="p-0">
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-4">Post Overview</h3>
                <Separator className="my-3" />
                <div className="text-sm space-y-3 text-gray-700">
                  <Info
                    icon={<Clock size={16} />}
                    label="Time"
                    value="09:00 AM"
                  />
                  <Info
                    icon={<Calendar size={16} />}
                    label="Date"
                    value="February 28, 2025"
                  />
                  <Info
                    icon={<FaEye size={16} />}
                    label="Post Views"
                    value="2967 People"
                  />

                  <div className="flex items-center justify-between">
                    <p className="font-medium flex gap-2">
                      <Share2 size={16} /> Share this Ad
                    </p>
                    <div className="flex gap-3">
                      <Facebook size={18} />
                      <Twitter size={18} />
                      <Linkedin size={18} />
                      <Instagram size={18} />
                    </div>
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
