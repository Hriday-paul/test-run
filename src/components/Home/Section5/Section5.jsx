"use client";
import Image from "next/image";
import CountUp from "react-countup";

export default function Section5() {
    return (
        <section className="relative w-full mt-16 md:mt-20 lg:mt-28">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image src="/car-parking.jpg" alt="Cars Background" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative max-w-6xl mx-auto px-6 py-24 text-white">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
                    {/* Left Title */}
                    <div className="lg:w-[60%] flex items-center justify-center lg:justify-start">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium font-figtree leading-tight">
                            We offer customers a wide range of{" "}
                            <span className="text-primary">commercial cars</span> and{" "}
                            <span className="text-primary">luxury cars</span> for any occasion.
                        </h2>
                    </div>

                    {/* Right Description */}
                    <div className="lg:w-[40%] flex items-center">
                        <p className=" text-sm font-popin">
                            At our vehicle company, we believe everyone deserves the joy of driving a reliable
                            and comfortable vehicle no matter their budget. Our diverse fleet includes everything
                            from sleek sedans to spacious SUVs, all carefully maintained and offered at
                            competitive prices. With our fast and hassle-free booking process, you can easily
                            reserve the perfect vehicle in just a few clicks.
                        </p>
                    </div>
                </div>

                {/* Stats / Counters */}
                <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                    <div className="bg-black p-6 rounded-lg text-center flex-1">
                        <h3 className="text-3xl font-bold font-figtree text-primary">
                            <CountUp end={5000} duration={2} />+
                        </h3>
                        <p className="text-white/90 mt-2 font-figtree">Published Ads</p>
                    </div>
                    <div className="bg-black p-6 rounded-lg text-center flex-1">
                        <h3 className="text-3xl font-bold font-figtree text-primary">
                            <CountUp end={3265} duration={2} />+
                        </h3>
                        <p className="text-white/90 mt-2 font-figtree">Registered Users</p>
                    </div>
                    <div className="bg-black p-6 rounded-lg text-center flex-1">
                        <h3 className="text-3xl font-bold text-primary font-figtree">
                            <CountUp end={2000} duration={2} />+
                        </h3>
                        <p className="text-white/90 mt-2 font-figtree">Verified Users</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
