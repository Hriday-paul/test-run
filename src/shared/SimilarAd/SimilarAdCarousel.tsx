"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselDots,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"

// import Autoplay from "embla-carousel-autoplay"
import FeatureAddCard from '@/shared/FeatureAddCard'
import { Add } from "@/redux/types"

export default function SimilarAdCarousel({ data }: { data: Add[] }) {

    return (
        <>
            <Carousel
                // plugins={[
                //     Autoplay({ delay: 3500 })
                // ]}
                opts={{
                    align: "start",
                    // slidesToScroll: 4
                    loop: true
                }}
                className="w-full relative">
                <CarouselContent>
                    {data?.map((add) => (
                        <CarouselItem key={add?.id} className="md:basis-1/3 lg:basis-1/4">
                            <FeatureAddCard add={add} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselDots className='mt-5' /> */}
                {/* <CarouselPrevious /> */}
                <div className="absolute top-1/2 left-2 flex items-center justify-center">
                    <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90 hover:text-white" />
                </div>
                <div className="absolute top-1/2 right-2 flex items-center justify-center">
                    <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90 hover:text-white" />
                </div>
                
            </Carousel>
        </>
    )
}
