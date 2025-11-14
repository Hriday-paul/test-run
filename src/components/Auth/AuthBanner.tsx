"use client";

import Image from "next/image";
import bannerImg from "../../../public/auth-banner.jpg"

export default function AuthBanner({title}: {title?: string}) {
  return (
    <header className="relative h-[200px] sm:h-[300px] w-full">
      {/* Background Image */}
      <Image
        src={bannerImg}
        alt="auth banner"
        height={500}
        width={2000}
        className="object-cover w-full h-auto"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        {/* Glass Effect Title */}
        <h1 className="md:px-18 px-10 font-figtree py-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-white backdrop-blur-md bg-white/20 rounded border border-white/30 text-center">
          {title}
        </h1>
      </div>
    </header>
  );
}
