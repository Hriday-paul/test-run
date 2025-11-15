"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function ShopBanner({
  image,
  title,
  desc,
  children
}: {
  image: StaticImageData;
  title: string;
  desc: string;
  children : React.ReactNode
}) {
  return (
    <header className="relative w-full h-76 md:h-[430px]">
      <Image src={image} alt="Header Background" fill className="object-cover h-full w-full bg-black/50" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
        {/* Glass Effect Title */}
        <h1 className="md:px-18 px-10 font-figtree py-2 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
          {title}
        </h1>

        {/* Short Description */}
        <p className="text-sm sm:text-base md:text-lg text-white text-center max-w-2xl">
          {desc}
        </p>
      </div>
      <div className="absolute -bottom-4 left-0 w-full flex justify-center items-center">
        <div className="text-xs font-figtree text-gray-700 flex-row gap-x-1 justify-center items-center  bg-white px-5 py-2.5 rounded-md inline-flex">
          {children}
        </div>
      </div>
    </header>
  );
}
