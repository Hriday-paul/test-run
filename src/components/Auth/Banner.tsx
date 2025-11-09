"use client";

import Image from "next/image";

export default function Banner({title}: {title?: string}) {
  return (
    <header className="relative h-[200px] sm:h-[300px] w-full">
      {/* Background Image */}
      <Image
        src="/auth-banner.jpg"
        alt="Header Background"
        fill
        className="object-cover"
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
