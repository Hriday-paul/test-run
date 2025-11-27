"use client"
import { useAllServicesQuery } from '@/redux/api/services.api'
import ErrorComponent from '@/shared/ErrorComponent';
import React, { useState } from 'react'
import { Skeleton } from '../ui/skeleton';
import ServiceCard from './ServiceCard';

function DocumentServices() {
    const [searchText, setSearchText] = useState("");
    const { isLoading, isError, isSuccess, data } = useAllServicesQuery({searchTerm : searchText});

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 justify-between items-center mb-8 lg:mb-12 md:pt-5'>
                <div className='space-y-2 md:col-span-2'>
                    <h4 className='text-lg md:text-xl lg:text-2xl xl:text-3xl font-popin font-semibold text-black'>All Document Process List</h4>
                    <p className='tet-sm text-gray-800 font-popin'>The second view is that the house of the deceased also has a letter of demand for the house of the deceased and that demand is being paid by the government. The government of the deceased has been paying the illegal demand.</p>
                </div>
                <div className='md:col-span-1'>
                    <input
                        className="w-[250px] lg:w-[350px] py-2 bg-slate-50 px-4 border border-stroke rounded-md font-popin"
                        placeholder="Search..."
                        onChange={(e) => setSearchText(e?.target?.value)}
                        type='text'
                    ></input>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                {
                    isLoading ? <>
                        <Loader />
                        <Loader />
                        <Loader />
                        <Loader />
                    </> : isSuccess ? <>
                        {data?.data?.map(service => {
                            return <ServiceCard key={service?.id} service={service} />
                        })}
                    </> : <></>
                }
            </div>
        </div>
    )
}

export default DocumentServices

const Loader = () => {
    return (
        <div className="p-6 space-y-4 bg-white border border-stroke rounded-md">
            {/* Icon and Title Skeleton */}
            <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded flex-shrink-0" />
                <Skeleton className="h-6 w-48" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Price Section Skeleton */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
                <Skeleton className="h-5 w-32" />
            </div>

            {/* Button Skeleton */}
            <Skeleton className="h-12 w-full rounded" />
        </div>
    )
}