"use client"
import { Add } from "@/redux/types";
import { Calendar, Component, Gauge, Users } from "lucide-react";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { Button } from "../ui/button";
import Image from "next/image";
import { placeHolderBlurImg } from "@/utils/config";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";

function CarCard({ car }: { car: Add }) {

    const t = useTranslations("category_page.adCard");
    const locale = useLocale();

    return (
        <div
            className="border border-stroke rounded-xl overflow-hidden hover:shadow-sm transition-all p-0 font-figtree bg-white">
            <Image
                src={car?.images[0]?.url}
                alt={"runbd car ad image"}
                className="w-full h-52 object-cover z-0"
                height={1000}
                width={1000}
                placeholder="blur"
                blurDataURL={placeHolderBlurImg}
            />
            <Link href={`/carbuysell/${car?.slug}`}>
                <div className="p-5 space-y-2 bg-white rounded-t-2xl border-t border-stroke -mt-3 relative z-40">
                    <div className="border-b border-stroke pb-2 space-y-0.5">
                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                            {car?.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 gap-1">
                            <SlLocationPin size={16} />
                            {`${car?.division?.name || ''}${car?.division ? ', ' : ''}${car?.district?.name || ''}${car?.district ? ', ' : ''}${car?.area?.name || ''}`.trim() || 'N/A'}
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-gray-700 text-sm py-2">
                        <div className="flex flex-col justify-between items-start gap-3">
                            <span className="flex items-center gap-1 text-sm">
                                <Gauge size={20} /> {car?.car?.mileage || "N/A"} km
                            </span>
                            <span className="flex items-center text-sm gap-1">
                                <MdAirlineSeatReclineNormal size={20} /> {car?.car?.seat || "N/A"} Seats
                            </span>
                        </div>
                        <div className="flex flex-col justify-between items-start gap-3">
                            <span className="flex items-center gap-1 text-sm">
                                <Calendar size={16} /> {car?.car?.year || "N/A"}
                            </span>
                            <span className="flex items-center gap-1 text-sm">
                                <Component size={16} /> {car?.car?.brand || "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 flex items-center gap-1 text-base">
                            {car?.price ? `${t("currency")} ${(car?.price).toLocaleString(locale === "bn" ? "bn-BD" : "en-US")}` : "N/A"}
                        </p>
                        <Link href={`/carbuysell/${car?.slug}`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-primary hover:text-white bg-primary/10 hover:bg-primary transition-all duration-300 cursor-pointer py-5 px-6 font-popin"
                            >
                                {t("details")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CarCard