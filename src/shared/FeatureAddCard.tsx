import { Add } from "@/redux/types";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import Image from "next/image";
import { placeHolderBlurImg } from "@/utils/config";
import { Button } from "@/components/ui/button";

const categoryRouteMap: Record<string, string> = {
  Bike: "bikebuysell",
  Car: "carbuysell",
  Workshop: "workshop",
  Accessories: "accessories",
  Job: "jobs",
  Exchange: "exchange",
  Lawyer: "lawyers",
  CarRent: "car-rent",
};


function FeatureAddCard({ add }: { add: Add }) {
    
    return (
        <div
            className="border border-stroke rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0 font-figtree max-w-lg">
            <Image
                src={add?.images[0]?.url}
                alt={"runbd car ad image"}
                className="w-full h-56 object-cover z-0"
                height={500}
                width={1000}
                placeholder="blur"
                blurDataURL={placeHolderBlurImg}
            />
            <Link href={`/${categoryRouteMap[add?.category]}/${add?.id}`}>
                <div className="p-5 space-y-2 bg-white rounded-t-2xl border-t border-stroke -mt-3 relative z-40">
                    <div className="border-b border-stroke pb-2">
                        <h3 className="font-bold text-gray-900 text-lg">
                            {add?.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 gap-1">
                            <SlLocationPin size={16} /> {add?.division || "N/A"}
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-gray-700 text-sm py-2">
                        <p className="line-clamp-2 text-xs font-popin">{add?.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <p className="font-semibold text-gray-900 flex items-center gap-1 text-base">
                            Tk {add?.price}
                        </p>
                        <Link href={`/${categoryRouteMap[add?.category]}/${add?.id}`}>
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
export default FeatureAddCard