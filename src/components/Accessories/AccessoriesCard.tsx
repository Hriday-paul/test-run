import { Add } from "@/redux/types";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { Button } from "../ui/button";
import Image from "next/image";
import { placeHolderBlurImg } from "@/utils/config";

function AccessoriesCard({ accessories }: { accessories: Add }) {
    return (
        <div
            className="border border-stroke rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0 font-figtree bg-white">
            <Image
                src={accessories?.images[0]?.url}
                alt={"runbd car ad image"}
                className="w-full h-56 object-cover z-0"
                height={1000}
                width={1000}
                placeholder="blur"
                blurDataURL={placeHolderBlurImg}
            />
            <Link href={`/accessories/${accessories?.id}`}>
                <div className="p-5 space-y-2 bg-white rounded-t-2xl border-t border-stroke -mt-3 relative z-40">
                    <div className="border-b border-stroke pb-2 space-y-0.5">
                        <h3 className="font-semibold text-gray-900 text-lg">
                            {accessories?.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 gap-1">
                            <SlLocationPin size={16} /> {accessories?.division?.name || "N/A"}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 flex items-center gap-1 text-base">
                            {accessories?.price ? `Tk ${accessories?.price}` : "N/A"}
                        </p>
                        <Link href={`/accessories/${accessories?.id}`}>
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

export default AccessoriesCard