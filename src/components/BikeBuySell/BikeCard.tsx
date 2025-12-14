import { Add } from "@/redux/types";
import { Bike, Calendar, Component, Gauge, Users } from "lucide-react";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { Button } from "../ui/button";
import Image from "next/image";
import { placeHolderBlurImg } from "@/utils/config";
import { AiOutlineWoman } from "react-icons/ai";

function BikeCard({ bike }: { bike: Add }) {
    return (
        <div
            className="border border-stroke rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0 font-figtree max-w-lg">
            <Image
                src={bike?.images[0]?.url}
                alt={"runbd car ad image"}
                className="w-full h-56 object-cover z-0"
                height={500}
                width={1000}
                placeholder="blur"
                blurDataURL={placeHolderBlurImg}
            />
            <Link href={`/bikebuysell/${bike?.id}`}>
                <div className="p-5 space-y-2 bg-white rounded-t-2xl border-t border-stroke -mt-3 relative z-40">
                    <div className="border-b border-stroke pb-2">
                        <h3 className="font-bold text-gray-900 text-lg">
                            {bike?.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 gap-1">
                            <SlLocationPin size={16} /> {bike?.division?.name || "N/A"}
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-gray-700 text-sm py-2">
                        <div className="flex flex-col justify-between items-start gap-3">
                            <span className="flex items-center gap-1 text-base">
                                <Gauge size={22} /> {bike?.bike?.mileage || "N/A"} km
                            </span>
                            <span className="flex items-center text-base gap-1">
                                <AiOutlineWoman size={25} /> {bike?.bike?.condition || "N/A"}
                            </span>
                        </div>
                        <div className="flex flex-col justify-between items-start gap-3">
                            <span className="flex items-center gap-1 text-base">
                                <Calendar size={20} /> {bike?.bike?.year || "N/A"}
                            </span>
                            <span className="flex items-center gap-1 text-base">
                                <Component size={20} /> {bike?.bike?.brand || "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <p className="font-semibold text-gray-900 flex items-center gap-1 text-base">
                            {bike?.price ? `Tk ${bike?.price}` : "N/A"}
                        </p>
                        <Link href={`/bikebuysell/${bike?.id}`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-primary hover:text-white bg-primary/10 hover:bg-primary transition-all duration-300 cursor-pointer py-5 px-6 font-popin"
                            >
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BikeCard