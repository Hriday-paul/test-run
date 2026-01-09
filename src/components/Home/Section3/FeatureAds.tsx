"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselDots
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import FeatureAddCard from '@/shared/FeatureAddCard'
import { Add } from "@/redux/types"

function FeatureAds({ data }: { data: { data: { ad: Add, id: number }[] } }) {

    return (
        <>
            <Carousel
                plugins={[
                    Autoplay({ delay: 3500 })
                ]}
                opts={{
                    align: "start",
                    // slidesToScroll: 4
                    // loop: true
                }}
                className="w-full">
                <CarouselContent>
                    {data?.data.map((add) => (
                        <CarouselItem key={add?.id} className="md:basis-1/3 lg:basis-1/4">
                            <FeatureAddCard add={add?.ad} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselDots className='mt-5' />
            </Carousel>
        </>
    )
}

export default FeatureAds