"use client"

import { useAllcarsQuery } from "@/redux/api/ads.api"
import ErrorComponent from "@/shared/ErrorComponent";
import CarCard from "./CarCard";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import SortBar from "./SortBar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Pagination from "../ui/Pagination";
import { LoadingCard } from "@/shared/LoadingCard";


function Cars() {

    const searchParams = useSearchParams();

    const limit = searchParams?.get("limit");
    const sort = searchParams?.get("sort");
    // const page = useSearchParams()?.get("page");
    const minPrice = searchParams?.get("minPrice");
    const maxPrice = searchParams?.get("maxPrice");
    const minMileage = searchParams?.get("minMileage");
    const maxMileage = searchParams?.get("maxMileage");
    const division = searchParams?.get("division");
    const condition = searchParams?.get("condition");
    const brand = searchParams?.get("brand");

    let sortBy = "createdAt";
    let orderBy = "desc"

    if (sort == "-createdAt") {
        orderBy = "asc"
    } else if (sort == "price") {
        sortBy = "price";
        orderBy = "asc"
    }
    else if (sort == "-price") {
        sortBy = "price";
        orderBy = "desc"
    }

    const [page, setPage] = useState<number>(1);

    const query: any = { page, sortBy, sortOrder : orderBy }

    if (minPrice) {
        query.minPrice = minPrice
    }
    if (maxPrice) {
        query.maxPrice = maxPrice
    }
    if (minMileage) {
        query.minMileage = minMileage
    }
    if (maxMileage) {
        query.maxMileage = maxMileage
    }
    if (division) {
        query.division = division
    }
    if (condition) {
        query.condition = condition
    }
    if (brand) {
        query.brand = brand
    }
    if (limit) {
        query.limit = limit
    }



    const { isLoading, isError, isSuccess, data } = useAllcarsQuery(query);

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
                {isLoading && <>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </>}
            </div>
            <div className="mt-3">
                <Pagination
                    totalPages={data?.data?.meta?.totalPage || 1}
                    initialPage={1}
                    onPageChange={(n) => setPage(n)}
                    maxDisplayedPages={5}
                />
            </div>
        </div>
    )
}

export default Cars