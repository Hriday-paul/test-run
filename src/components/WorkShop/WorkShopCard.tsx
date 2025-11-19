import { Add } from "@/redux/types";
import { Bike, Calendar, Component, Gauge, Users } from "lucide-react";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { Button } from "../ui/button";
import Image from "next/image";
import { placeHolderBlurImg } from "@/utils/config";
import { AiOutlineWoman } from "react-icons/ai";

function WorkShopCard({ workShop }: { workShop: Add }) {
    return (
        <div
            className="border border-stroke rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0 font-figtree max-w-lg">
            <Image
                src={workShop?.images[0]?.url}
                alt={"runbd car ad image"}
                className="w-full h-56 object-cover z-0"
                height={500}
                width={1000}
                placeholder="blur"
                blurDataURL={placeHolderBlurImg}
            />

            <div className="p-5 space-y-2 bg-white rounded-t-2xl border-t border-stroke -mt-3 relative z-40">
                <Link href={`/workshop/${workShop?.id}`}>
                    <div className="">
                        <div className="border-b border-stroke pb-2">
                            <h3 className="font-bold text-gray-900 text-lg">
                                {workShop?.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600 gap-1">
                                <SlLocationPin size={16} /> {workShop?.division || "N/A"}
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href={`/workshop/${workShop?.id}`} className="w-full">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-primary w-full hover:text-white bg-primary/10 hover:bg-primary transition-all duration-300 cursor-pointer py-5 px-6 font-popin  mt-4"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </div>

    )
}

export default WorkShopCard