"use client"
import { UseUpdateMultipleSearchParams } from '@/hooks/UseUpdateSearchPrams';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { PiTruckLight } from 'react-icons/pi'
import { TbBus, TbCar } from "react-icons/tb";

const carTypes = [
    {
        id: 0,
        name: "All",
        value: null,
        icon: <MdOutlineDashboardCustomize className='text-base md:text-lg' />
    },
    {
        id: 1,
        name: "Truck",
        value: "Truck",
        icon: <PiTruckLight className='text-base md:text-lg' />
    },
    {
        id: 2,
        name: "Bus",
        value: "Bus",
        icon: <TbBus className='text-base md:text-lg' />
    },
    {
        id: 3,
        name: "Mini Bus",
        value: "Mini Bus",
        icon: <TbCar className='text-base md:text-lg' />
    },
]


function CarSearchBar() {

    const updateMultipleSearchParam = UseUpdateMultipleSearchParams();
    const searchTerm = useSearchParams().get("searchTerm");
    const car_type = useSearchParams().get("car_type");


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const search = formData.get('search');
        updateMultipleSearchParam({ searchTerm: search as string })
    };

    return (
        <div className='flex flex-col lg:flex-row justify-between items-center gap-5'>
            <div className='flex flex-row flex-wrap items-center gap-2'>
                {
                    carTypes?.map(i => {
                        return <button onClick={() => updateMultipleSearchParam({ car_type: i?.value })} key={i?.id} className={`flex flex-row items-center gap-x-1 border ${(car_type == i?.name || (i?.id == 0 && !car_type)) ? "bg-primary text-white" : "bg-white text-black"} border-stroke px-3 md:px-4 lg:px-5 py-1.5 md:py-2 rounded cursor-pointer`}>
                            {i?.icon}
                            <p className='text-sm md:text-base font-popin'>{i?.name}</p>
                        </button>
                    })
                }
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    className="w-[250px] lg:w-[350px] py-2 bg-slate-50 px-4 border border-stroke rounded-md rounded-r-none font-popin focus:outline-0"
                    placeholder="Search..."
                    name='search'
                    defaultValue={searchTerm || ""}
                    type='text'
                ></input>
                <button type='submit' className='bg-primary text-white px-3 py-2 rounded rounded-l-none font-figtree cursor-pointer hover:opacity-70 duration-200 border border-white border-l-0'>Search</button>
            </form>

        </div>
    )
}

export default CarSearchBar