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
    {
        id: 3,
        name: "Car/Hiace",
        value: "Hiace",
        icon: <TbCar className='text-base md:text-lg' />
    },
]


function CarSearchBar() {

    const updateMultipleSearchParam = UseUpdateMultipleSearchParams();
    const car_type = useSearchParams().get("car_type");

    return (
        <div className='flex flex-col lg:flex-row justify-between items-center gap-5 w-auto'>
            <div className='flex flex-row flex-wrap items-center gap-2'>
                {
                    carTypes?.map(i => {
                        return <button onClick={() => updateMultipleSearchParam({ car_type: i?.value })} key={i?.id} className={`flex flex-row items-center gap-x-1 border ${(car_type == i?.value || (i?.id == 0 && !car_type)) ? "bg-primary text-white" : "bg-white text-black"} border-stroke px-3 md:px-4 lg:px-5 py-1.5 md:py-2 rounded cursor-pointer`}>
                            {i?.icon}
                            <p className='text-sm md:text-base font-popin'>{i?.name}</p>
                        </button>
                    })
                }
            </div>

        </div>
    )
}

export default CarSearchBar