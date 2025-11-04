"use client"
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselDots
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import Image from 'next/image'

type addType = {
    id: number,
    title: string,
    price: string,
    date: string,
    vendor: string

}

const ads = [
    {
        id: 1,
        title: "Brown Pomeranian",
        price: "220$ - 300$",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 2,
        title: "Brown Pomeranian",
        price: "220$ - 300$",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 3,
        title: "Brown Pomeranian",
        price: "220$ - 300$",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 4,
        title: "Brown Pomeranian",
        price: "220$ - 300$",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 5,
        title: "Brown Pomeranian",
        price: "220$ - 300$",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 6,
        title: "Brown Pomeranian",
        price: "220$ - 300$",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },

    // {
    //     id: 10,
    //     title: "Brown Pomeranian",
    //     price: "220$ - 300$",
    //     date: "10 days ago",
    //     vendor: "Hriday Paul"
    // },
    // {
    //     id: 20,
    //     title: "Brown Pomeranian",
    //     price: "220$ - 300$",
    //     date: "10 days ago",
    //     vendor: "Hriday Paul"
    // },
    // {
    //     id: 30,
    //     title: "Brown Pomeranian",
    //     price: "220$ - 300$",
    //     date: "10 days ago",
    //     vendor: "Hriday Paul"
    // },
    // {
    //     id: 40,
    //     title: "Brown Pomeranian",
    //     price: "220$ - 300$",
    //     date: "10 days ago",
    //     vendor: "Hriday Paul"
    // },
    // {
    //     id: 50,
    //     title: "Brown Pomeranian",
    //     price: "220$ - 300$",
    //     date: "10 days ago",
    //     vendor: "Hriday Paul"
    // },
    // {
    //     id: 60,
    //     title: "Brown Pomeranian",
    //     price: "220$ - 300$",
    //     date: "10 days ago",
    //     vendor: "Hriday Paul"
    // },
]

function FeatureAds() {
    return (
        <div>
            <Carousel
                plugins={[
                    Autoplay({ delay: 2000 })
                ]}
                opts={{
                    align: "start",
                    loop : true
                }}
                className="w-full"
            >
                <CarouselContent>
                    {ads.map((add, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                            <FeatureAddCard add={add} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
                <CarouselDots className='mt-5' />
            </Carousel>
        </div>
    )
}

export default FeatureAds

const FeatureAddCard = ({ add }: { add: addType }) => {
    return <div className='bg-white'>
        <Image src="/feature-1.png" alt='feature add image' className='w-full h-64 object-cover' height={4000} width={2000} />
        <div className='p-4 space-y-2'>
            <h6 className='text-xl text-black font-figtree font-medium'>{add?.title}</h6>
            <h6 className='text-xl text-primary font-figtree font-medium'>{add?.price}</h6>
            <div>
                <p className='text-zinc-600 text-sm font-popin'>{add?.vendor}</p>
            </div>
        </div>
    </div>
}