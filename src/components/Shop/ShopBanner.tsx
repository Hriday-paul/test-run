"use client";

import Image from "next/image";

export default function ShopBanner({
  path,
  title,
  desc,
}: {
  path: string;
  title: string;
  desc: string;
}) {
  return (
    <header className="relative w-full h-76 md:h-[430px]">
      <Image src={path} alt="Header Background" fill className="object-cover" />

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
    </header>
  );
}
