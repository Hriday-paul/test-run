import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

type addType ={
        id : number,
        title : string,
        price : string,
        date: string,
        vendor : string
    
}

const ads = [
    {
        id: 1,
        title: "Brown Pomeranian",
        price: "220 - 300",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 2,
        title: "Brown Pomeranian",
        price: "220 - 300",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 3,
        title: "Brown Pomeranian",
        price: "220 - 300",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 4,
        title: "Brown Pomeranian",
        price: "220 - 300",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 5,
        title: "Brown Pomeranian",
        price: "220 - 300",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
    {
        id: 6,
        title: "Brown Pomeranian",
        price: "220 - 300",
        date: "10 days ago",
        vendor: "Hriday Paul"
    },
]

function FeatureAds() {
    return (
        <div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-sm"
            >
                <CarouselContent>
                    {ads.map((add, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <FeatureAddCard add={add} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default FeatureAds

const FeatureAddCard = ({add}:{add : addType}) => {
    return <div className='bg-white'>
        <Image src="/feature-1.png" alt='feature add image' className='w-full h-40 object-cover' />
        <div className='p-2 space-y-2'>
            <h6 className='text-xl text-black font-figtree font-medium'>{add?.title}</h6>
            <h6 className='text-xl text-primary font-figtree font-medium'>{add?.price}</h6>
            <div>
                <p className='text-zinc-600 text-sm font-popi'>{}</p>
            </div>
        </div>
    </div>
}