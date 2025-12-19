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
import Image from "next/image";
import Searchbar from "../BikeBuySell/Searchbar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AiOutlineFilter } from "react-icons/ai";
import CarFilter from "./CarFilter";


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
    const district = searchParams?.get("district");
    const area = searchParams?.get("area");
    const condition = searchParams?.get("condition");
    const brand = searchParams?.get("brand");
    const car_type = searchParams?.get("car_type");
    const searchTerm = searchParams?.get("searchTerm");
    

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

    const query: any = { page, sortBy, sortOrder: orderBy }

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
    if (district) {
        query.district = district
    }
    if (area) {
        query.area = area
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
    if (car_type) {
        query.car_type = car_type
    }
    if (searchTerm) {
        query.searchTerm = searchTerm
    }

    const { isLoading, isError, isSuccess, data } = useAllcarsQuery(query);

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div>
             <Searchbar />
            <div className="flex flex-row justify-between items-center py-4">
                <Popover >
                    <PopoverTrigger asChild>
                        <button className='bg-primary/10 rounded text-primary px-3 py-2 text-sm font-figtree font-medium cursor-default flex flex-row gap-x-3 items-center justify-between'>
                            <p>Filter</p>
                            <AiOutlineFilter className=' text-base' />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent side='bottom' align='start'>
                        <CarFilter />
                    </PopoverContent>
                </Popover>
                <p className="text-gray-500 text-sm font-popin font-medium flex flex-row gap-x-1.5 items-center">
                    <PiSlidersHorizontalDuotone className="text-xl" />
                    {isSuccess && data?.data?.meta?.total} items found
                </p>
                <SortBar limit={limit || "10"} sort={sort || "-createdAt"} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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

            {
                isSuccess && data?.data?.meta?.total <= 0 && <section className='min-h-[calc(25vh)] flex flex-col items-center justify-center'>
                    <Image src={"/empty_data.jpg"} height={1000} width={1000} className='h-28 w-auto mx-auto' alt='empty data' />
                    <h5 className='text-base font-figtree text-center'>Item is empty</h5>
                </section>
            }

            {isSuccess && data?.data?.meta?.total > 0 && <div className="mt-3">
                <Pagination
                    totalPages={data?.data?.meta?.totalPage || 1}
                    initialPage={1}
                    onPageChange={(n) => setPage(n)}
                    maxDisplayedPages={5}
                />
            </div>}
        </div>
    )
}

export default Cars