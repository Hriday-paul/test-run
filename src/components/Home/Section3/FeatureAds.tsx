"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselDots
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import { useAllFeatureAdsQuery } from '@/redux/api/ads.api'
import { LoadingCard } from '@/shared/LoadingCard'
import FeatureAddCard from '@/shared/FeatureAddCard'

function FeatureAds() {

    const { isLoading, isSuccess, data } = useAllFeatureAdsQuery();

    return (
        <div>

            {isLoading ? <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />

            </div> : isSuccess ?

                <Carousel
                    plugins={[
                        Autoplay({ delay: 2000 })
                    ]}
                    opts={{
                        align: "start",
                        // loop: true
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {data?.data.map((add) => (
                            <CarouselItem key={add?.id} className="md:basis-1/3 lg:basis-1/4">
                                <FeatureAddCard add={add?.ad} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious /> */}
                    {/* <CarouselNext /> */}
                    <CarouselDots className='mt-5' />
                </Carousel>

                :

                <></>

            }


        </div>
    )
}

export default FeatureAds