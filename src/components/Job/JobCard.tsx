import { Add } from "@/redux/types";
import { GrUserWorker } from "react-icons/gr";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { Button } from "../ui/button";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { PiBuildingOffice } from "react-icons/pi";
import { MdOutlineWorkOutline } from "react-icons/md";

function JobCard({ job }: { job: Add }) {
    return (
        <div
            className="border border-stroke rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0 font-figtree bg-white">
            <Link href={`/jobs/${job?.id}`}>
                <div className="p-5 space-y-2 bg-white rounded-t-2xl border-t border-stroke -mt-3 relative z-40">
                    <div className="border-b border-stroke py-4 space-y-1.5">
                        <h3 className="font-semibold text-gray-900 text-lg">
                            {job?.title}
                        </h3>
                        <div className="flex items-center text-sm font-popin font-medium gap-1">
                            <PiBuildingOffice size={16} /> {job?.job?.company_name || "N/A"}
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-gray-700 text-sm py-2">
                        <div className="flex flex-col justify-between items-start gap-3">
                            <span className="flex items-center gap-1 text-sm">
                                <RiMoneyDollarBoxLine size={18} /> {job?.job?.salary || "N/A"}
                            </span>
                            <span className="flex items-center text-sm gap-1">
                                <SlLocationPin size={18} /> {job?.job?.job_location || "N/A"}
                            </span>
                        </div>
                        <div className="flex flex-col justify-between items-start gap-3">
                            <span className="flex items-center gap-1 text-sm">
                                <MdOutlineWorkOutline size={16} /> {job?.job?.job_type || "N/A"}
                            </span>
                            <span className="flex items-center gap-1 text-sm">
                                <GrUserWorker size={16} /> {job?.job?.employment_type || "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="w-full pt-2">
                        <Link href={`/jobs/${job?.id}`}>
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

export default JobCard