import { Add } from "@/redux/types";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { Button } from "../ui/button";
import Image from "next/image";
import { placeHolderBlurImg } from "@/utils/config";

function RentCarCard({ rent }: { rent: Add }) {
    return (
        <div
            className="border border-stroke rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0 font-figtree max-w-lg">
            <Image
                src={rent?.images[0]?.url}
                alt={"runbd car ad image"}
                className="w-full h-52 object-cover z-0"
                height={500}
                width={1000}
                placeholder="blur"
                blurDataURL={placeHolderBlurImg}
            />
            <Link href={`/car-rent/${rent?.id}`}>
                <div className="p-5 space-y-2 bg-white rounded-t-2xl border-t border-stroke -mt-3 relative z-40">
                    <div className="border-b border-stroke py-4 space-y-2.5">
                        <h3 className="font-bold text-gray-900 text-lg">
                            {rent?.title}
                        </h3>
                        <p className="flex items-center text-sm font-popin gap-1">
                            <SlLocationPin size={16} /> {rent?.carRent?.location || "N/A"}
                        </p>
                    </div>
                    <div className="w-full pt-2">
                        <Link href={`/car-rent/${rent?.id}`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-primary hover:text-white bg-primary/10 hover:bg-primary transition-all duration-300 cursor-pointer py-5 px-6 font-popin w-full"
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

export default RentCarCard