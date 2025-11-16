"use client"

import { useAllcarsQuery } from "@/redux/api/ads.api"
import ErrorComponent from "@/shared/ErrorComponent";
import CarCard from "./CarCard";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import SortBar from "./SortBar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Pagination from "../ui/Pagination";


function Cars() {

    const limit = useSearchParams()?.get("limit");
    const sort = useSearchParams()?.get("sort");
    // const page = useSearchParams()?.get("page");
    const price = useSearchParams()?.get("price");
    const division = useSearchParams()?.get("division");
    const condition = useSearchParams()?.get("condition");
    const brand = useSearchParams()?.get("brand");

    const [page, setPage] = useState<number>(1);

    const { isLoading, isError, isSuccess, data } = useAllcarsQuery({});

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center py-4">
                <p className="text-gray-500 text-sm font-popin font-medium flex flex-row gap-x-1.5 items-center">
                    <PiSlidersHorizontalDuotone className="text-xl" />
                    {isSuccess && data?.data?.meta?.total} items found
                </p>
                <SortBar limit={limit || "10"} sort={sort || "createdAt"} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {isSuccess && data?.data?.data?.map(car => {
                    return <CarCard key={car?.id} car={car} />
                })}
            </div>
            <Pagination
                totalPages={data?.data?.meta?.totalPage || 1}
                initialPage={1}
                onPageChange={(n) => setPage(n)}
                maxDisplayedPages={5}
            />
        </div>
    )
}

export default Cars